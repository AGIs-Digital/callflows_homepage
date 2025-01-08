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

// Set CORS headers based on environment
$allowedOrigins = [
    'https://staging.callflows.de',
    'https://callflows.de',
    'http://localhost:3000' // Für lokale Entwicklung
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
    $data = json_decode(file_get_contents('php://input'), true);
    logMessage('INFO', 'Form submission received', $data);
    
    // Validierung
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        logMessage('ERROR', 'Validation failed: Missing required fields', $data);
        http_response_code(400);
        echo json_encode(['error' => 'Fehlende Pflichtfelder']);
        exit;
    }

    $to = 'kontakt@callflows.de';
    $subject = isset($data['source']) ? 'Anfrage ' . ucfirst($data['source']) : 'Neue Kontaktanfrage';
    
    // HTML E-Mail Template
    $htmlMessage = "
    <div style='font-family: sans-serif; max-width: 600px; margin: 0 auto;'>
        <h2 style='color: #00A6C0;'>Neue Kontaktanfrage</h2>
        <div style='background-color: #f9fafb; padding: 20px; border-radius: 8px;'>
            <p><strong>Name:</strong> {$data['name']}</p>
            <p><strong>E-Mail:</strong> {$data['email']}</p>
            " . (isset($data['phone']) ? "<p><strong>Telefon:</strong> {$data['phone']}</p>" : "") . "
            <p><strong>Nachricht:</strong></p>
            <p style='white-space: pre-wrap;'>{$data['message']}</p>
            " . (isset($data['source']) ? "<p><strong>Quelle:</strong> {$data['source']}</p>" : "") . "
        </div>
    </div>";

    // E-Mail Header
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: Callflows Kontaktformular <noreply@callflows.de>',
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