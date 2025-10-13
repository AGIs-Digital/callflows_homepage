<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 0); // Nie Fehler an Client zeigen (Security)
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/call-test.log');
date_default_timezone_set('Europe/Berlin');

function logMessage($type, $message, $data = null) {
    $timestamp = date('Y-m-d H:i:s');
    $env = strpos($_SERVER['HTTP_HOST'], 'staging') === false ? 'PROD' : 'STAGING';
    $logEntry = "[$timestamp] [$env] [$type] $message";
    if ($data) {
        $logEntry .= " Data: " . json_encode($data, JSON_UNESCAPED_UNICODE);
    }
    error_log($logEntry);
}

// Rate Limiting Class
class RateLimiter {
    private $cacheFile;
    private $maxRequests;
    private $timeWindow;
    
    public function __construct($maxRequests = 3, $timeWindow = 600) { // 3 requests per 10 minutes
        $this->cacheFile = __DIR__ . '/call_test_rate_limit.json';
        $this->maxRequests = $maxRequests;
        $this->timeWindow = $timeWindow;
    }
    
    public function isAllowed($ip) {
        $cache = $this->loadCache();
        $now = time();
        
        // Clean expired entries
        $cache = array_filter($cache, function($data) use ($now) {
            return ($now - $data['first_request']) < $this->timeWindow;
        });
        
        if (!isset($cache[$ip])) {
            $cache[$ip] = [
                'count' => 1,
                'first_request' => $now,
                'last_request' => $now
            ];
            $this->saveCache($cache);
            return true;
        }
        
        $cache[$ip]['count']++;
        $cache[$ip]['last_request'] = $now;
        $this->saveCache($cache);
        
        return $cache[$ip]['count'] <= $this->maxRequests;
    }
    
    private function loadCache() {
        if (!file_exists($this->cacheFile)) {
            return [];
        }
        $content = file_get_contents($this->cacheFile);
        return json_decode($content, true) ?: [];
    }
    
    private function saveCache($cache) {
        file_put_contents($this->cacheFile, json_encode($cache));
    }
}

// Set CORS headers based on environment
$allowedOrigins = [
    'https://staging.callflows.de',
    'https://callflows.de',
    'http://localhost:3000'
];

$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get client IP for rate limiting
    $clientIP = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['HTTP_X_REAL_IP'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if (strpos($clientIP, ',') !== false) {
        $clientIP = trim(explode(',', $clientIP)[0]);
    }
    
    // Initialize rate limiter
    $rateLimiter = new RateLimiter(3, 600); // 3 calls per 10 minutes
    
    // Check rate limit
    if (!$rateLimiter->isAllowed($clientIP)) {
        logMessage('WARNING', 'Rate limit exceeded for call test', ['ip' => $clientIP]);
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'error' => 'Zu viele Anfragen. Bitte warten Sie 10 Minuten bevor Sie erneut anrufen.'
        ]);
        exit;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    logMessage('INFO', 'Call test request received', array_merge($data, ['ip' => $clientIP]));
    
    // Validation
    if (!isset($data['phoneNumber']) || !isset($data['customerName'])) {
        logMessage('ERROR', 'Validation failed: Missing required fields', $data);
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Fehlende Pflichtfelder'
        ]);
        exit;
    }
    
    $phoneNumber = trim($data['phoneNumber']);
    $customerName = trim($data['customerName']);
    
    // Name validation
    if (strlen($customerName) < 2 || strlen($customerName) > 100) {
        logMessage('ERROR', 'Invalid name length', $data);
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Name muss zwischen 2 und 100 Zeichen lang sein'
        ]);
        exit;
    }
    
    // International phone number validation (E.164 Standard)
    $cleanNumber = preg_replace('/[\s\-\(\)]/', '', $phoneNumber);
    
    // International: + followed by 7-15 digits
    // German without +: 0 followed by 5-12 digits
    $isValidInternational = preg_match('/^\+\d{7,15}$/', $cleanNumber);
    $isValidGerman = preg_match('/^0\d{5,12}$/', $cleanNumber);
    
    if (!$isValidInternational && !$isValidGerman) {
        logMessage('ERROR', 'Invalid phone number format', ['phone' => $phoneNumber]);
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Bitte geben Sie eine gültige Telefonnummer ein (Format: +49... oder 0...)'
        ]);
        exit;
    }
    
    // Normalize German numbers (0 to +49)
    $normalizedNumber = $cleanNumber;
    if (preg_match('/^0[^0]/', $cleanNumber)) {
        $normalizedNumber = '+49' . substr($cleanNumber, 1);
    }
    
    // Prepare n8n webhook payload
    $webhookPayload = [
        'customer_name' => $customerName,
        'customer_phone' => $normalizedNumber
    ];
    
    // n8n Webhook Configuration
    $n8nWebhookUrl = getenv('N8N_WEBHOOK_URL');
    
    // Development fallback (nur für lokale Tests)
    if (empty($n8nWebhookUrl)) {
        // Simuliere erfolgreichen Call in Dev-Mode
        logMessage('DEV', 'Development mode - simulating call', $webhookPayload);
        
        echo json_encode([
            'success' => true,
            'message' => 'Anruf erfolgreich gestartet für ' . $customerName,
            'callId' => 'dev_' . time(),
            'estimatedCallTime' => '30-60 Sekunden'
        ]);
        exit;
    }
    
    // Production: Call n8n webhook
    $ch = curl_init($n8nWebhookUrl);
    
    $headers = [
        'Content-Type: application/json',
        'User-Agent: callflows-website/1.0',
        'X-Webhook-Source: callflows-widget'
    ];
    
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($webhookPayload),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_SSL_VERIFYHOST => 2
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    if ($curlError || $httpCode !== 200) {
        logMessage('ERROR', 'n8n webhook call failed', [
            'http_code' => $httpCode,
            'error' => $curlError,
            'response' => $response
        ]);
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Anruf konnte nicht gestartet werden. Bitte versuchen Sie es später erneut.'
        ]);
        exit;
    }
    
    $result = json_decode($response, true);
    
    logMessage('SUCCESS', 'Call initiated successfully', [
        'customer' => $customerName,
        'phone' => $normalizedNumber
    ]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Anruf erfolgreich gestartet für ' . $customerName,
        'callId' => $result['callId'] ?? 'call_' . time(),
        'estimatedCallTime' => '30-60 Sekunden'
    ]);
    
} else {
    logMessage('ERROR', 'Invalid request method: ' . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Methode nicht erlaubt'
    ]);
}
?>