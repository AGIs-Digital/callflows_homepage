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
    $data = json_decode(file_get_contents('php://input'), true);
    logMessage('INFO', 'Form submission received', $data);
    
    // Validation
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        logMessage('ERROR', 'Validation failed: Missing required fields', $data);
        http_response_code(400);
        echo json_encode(['error' => 'Fehlende Pflichtfelder']);
        exit;
    }

    // Dynamic subject based on source
    $subjectMap = [
        'inbound' => 'Anfrage Inbound',
        'outbound' => 'Anfrage Outbound',
        'enterprise' => 'Anfrage Enterprise',
        'contact' => 'Anfrage Kontakt'
    ];
    
    $source = isset($data['source']) ? $data['source'] : 'contact';
    $subject = $subjectMap[$source] ?? 'Neue Kontaktanfrage';

    $to = 'kontakt@callflows.de';
    
    // Logo als Base64 einbetten
    $logoPath = __DIR__ . '/../../images/callflows_brand_no_claim.png';
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
            .content { background-color: #ffffff; padding: 30px; border-radius: 8px; margin-top: 20px; }
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
                <img src='{$logoSrc}' alt='Callflows Logo' style='max-width: 200px;'>
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
        'From: Kontaktformular <noreply@callflows.de>',
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