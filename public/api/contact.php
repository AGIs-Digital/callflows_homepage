<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/contact-form.log');
date_default_timezone_set('Europe/Berlin');

function logMessage($type, $message, $data = null) {
    $timestamp = date('Y-m-d H:i:s');
    $env = strpos($_SERVER['HTTP_HOST'], 'staging') === false ? 'PROD' : 'STAGING';
    $logEntry = "[$timestamp] [$env] [$type] $message";
    if ($data) {
        $logEntry .= " Data: " . json_encode($data);
    }
    error_log($logEntry);
}

// Rate Limiting Class
class RateLimiter {
    private $cacheFile;
    private $maxRequests;
    private $timeWindow;
    
    public function __construct($maxRequests = 5, $timeWindow = 900) { // 5 requests per 15 minutes
        $this->cacheFile = __DIR__ . '/rate_limit_cache.json';
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

// Spam Detection Class
class SpamDetector {
    private $suspiciousPatterns = [
        '/\b(viagra|cialis|pharmacy|casino|poker|lottery|bitcoin|crypto)\b/i',
        '/\b(buy now|click here|limited time|act now|free money)\b/i',
        '/https?:\/\/[^\s]+/i', // URLs in message
        '/\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/', // Credit card patterns
        '/[A-Z]{10,}/', // Excessive caps
    ];
    
    public function isSpam($text) {
        foreach ($this->suspiciousPatterns as $pattern) {
            if (preg_match($pattern, $text)) {
                return true;
            }
        }
        
        // Check for excessive repetition
        $words = str_word_count($text, 1);
        if (count($words) > 0) {
            $wordCounts = array_count_values($words);
            $maxRepetition = max($wordCounts);
            if ($maxRepetition > 5) { // Same word repeated more than 5 times
                return true;
            }
        }
        
        return false;
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

header('Access-Control-Allow-Methods: POST');
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
    
    // Initialize rate limiter and spam detector
    $rateLimiter = new RateLimiter(5, 900); // 5 requests per 15 minutes
    $spamDetector = new SpamDetector();
    
    // Check rate limit
    if (!$rateLimiter->isAllowed($clientIP)) {
        logMessage('WARNING', 'Rate limit exceeded', ['ip' => $clientIP]);
        http_response_code(429);
        echo json_encode(['error' => 'Zu viele Anfragen. Bitte warten Sie 15 Minuten bevor Sie erneut senden.']);
        exit;
    }
    
    $data = json_decode(file_get_contents('php://input'), true);
    logMessage('INFO', 'Form submission received', array_merge($data, ['ip' => $clientIP]));
    
    // Validation
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        logMessage('ERROR', 'Validation failed: Missing required fields', $data);
        http_response_code(400);
        echo json_encode(['error' => 'Fehlende Pflichtfelder']);
        exit;
    }
    
    // Spam Detection
    $messageText = $data['name'] . ' ' . $data['email'] . ' ' . $data['message'];
    if ($spamDetector->isSpam($messageText)) {
        logMessage('WARNING', 'Spam detected', ['ip' => $clientIP, 'data' => $data]);
        http_response_code(400);
        echo json_encode(['error' => 'Ihre Nachricht wurde als Spam erkannt. Bitte verwenden Sie eine andere Formulierung.']);
        exit;
    }
    
    // Additional validation
    if (strlen($data['name']) < 2 || strlen($data['name']) > 100) {
        logMessage('ERROR', 'Invalid name length', $data);
        http_response_code(400);
        echo json_encode(['error' => 'Name muss zwischen 2 und 100 Zeichen lang sein']);
        exit;
    }
    
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        logMessage('ERROR', 'Invalid email format', $data);
        http_response_code(400);
        echo json_encode(['error' => 'Ungültige E-Mail-Adresse']);
        exit;
    }
    
    if (strlen($data['message']) < 10 || strlen($data['message']) > 2000) {
        logMessage('ERROR', 'Invalid message length', $data);
        http_response_code(400);
        echo json_encode(['error' => 'Nachricht muss zwischen 10 und 2000 Zeichen lang sein']);
        exit;
    }

    // Subject für alle Anfragen einheitlich
    $subject = 'Neue Kontaktanfrage von callflows.de';

    $to = 'info@callflows.de';
    
    // Logo als Base64 einbetten
    $logoPath = __DIR__ . '/../../images/callflows_brand_no_claim.webp';
    $logoType = pathinfo($logoPath, PATHINFO_EXTENSION);
    $logoData = file_get_contents($logoPath);
    $logoBase64 = base64_encode($logoData);
    $logoSrc = "data:image/{$logoType};base64,{$logoBase64}";

    // Modern HTML Email Template
    $htmlMessage = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>{$subject}</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #004AAD; padding: 20px; text-align: center; }
            .header img { max-width: 200px; }
            .content { background-color: #FFFFF0; padding: 30px; border-radius: 8px; margin-top: 20px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .field { margin-bottom: 20px; }
            .field-label { font-weight: bold; color: #004AAD; }
            .source-tag { 
                display: inline-block;
                padding: 5px 10px;
                background-color: #FFB703;
                color: #333;
                border-radius: 4px;
                font-size: 14px;
                margin-top: 10px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <img src='{$logoSrc}' alt='callflows Logo' style='max-width: 200px;'>
            </div>
            <div class='content'>
                <h2 style='color: #004AAD; margin-bottom: 30px;'>{$subject}</h2>
                
                <div class='field'>
                    <div class='field-label'>Name:</div>
                    <div>{$data['name']}</div>
                </div>
                
                <div class='field'>
                    <div class='field-label'>E-Mail:</div>
                    <div>{$data['email']}</div>
                </div>
                
                " . (isset($data['phone']) ? "
                <div class='field'>
                    <div class='field-label'>Telefon:</div>
                    <div>{$data['phone']}</div>
                </div>
                " : "") . "
                
                <div class='field'>
                    <div class='field-label'>Nachricht:</div>
                    <div style='white-space: pre-line; line-height: 1.5;'>{$data['message']}</div>
                </div>
                
                <div class='source-tag'>{$subject}</div>
            </div>
            <div class='footer'>
                <p>Diese E-Mail wurde über das Kontaktformular auf callflows.de gesendet.</p>
                <p>" . date('d.m.Y H:i:s') . "</p>
            </div>
        </div>
    </body>
    </html>";

    // Email Headers
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Kontaktformular <info@callflows.de>',
        'Reply-To: ' . $data['email'],
        'X-Mailer: PHP/' . phpversion()
    ];

    if (mail($to, $subject, $htmlMessage, implode("\r\n", $headers))) {
        logMessage('SUCCESS', 'Email sent successfully');
        echo json_encode(['success' => true]);
    } else {
        $error = error_get_last();
        logMessage('ERROR', 'Failed to send email', $error);
        http_response_code(500);
        echo json_encode(['error' => 'E-Mail konnte nicht gesendet werden']);
    }
} else {
    logMessage('ERROR', 'Invalid request method: ' . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['error' => 'Methode nicht erlaubt']);
}
?>