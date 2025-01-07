<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
date_default_timezone_set('Europe/Berlin');

// Determine environment and set log path accordingly
$isProduction = strpos($_SERVER['HTTP_HOST'], 'staging') === false;
$logPath = $isProduction ? '/logs/contact-form/contact-form.log' : '/logs/contact-form/staging-contact-form.log';
ini_set('error_log', __DIR__ . '/..' . $logPath);

function logMessage($type, $message, $data = null) {
    $timestamp = date('Y-m-d H:i:s');
    $env = strpos($_SERVER['HTTP_HOST'], 'staging') === false ? 'PROD' : 'STAGING';
    $logEntry = "[$timestamp] [$env] [$type] $message";
    if ($data) {
        $logEntry .= " Data: " . json_encode($data);
    }
    error_log($logEntry);
}

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

logMessage('INFO', 'Request received: ' . $_SERVER['REQUEST_METHOD']);

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
    logMessage('INFO', 'Preparing to send email to: ' . $to);
    
    $message = "Name: " . $data['name'] . "\n";
    $message .= "E-Mail: " . $data['email'] . "\n";
    if (isset($data['phone'])) {
        $message .= "Telefon: " . $data['phone'] . "\n";
    }
    $message .= "Nachricht: " . $data['message'] . "\n";
    if (isset($data['source'])) {
        $message .= "Quelle: " . $data['source'];
    }

    $headers = [
        'From' => 'noreply@callflows.de',
        'Reply-To' => $data['email'],
        'X-Mailer' => 'PHP/' . phpversion()
    ];

    if (mail($to, $subject, $message, $headers)) {
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