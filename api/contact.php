<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', dirname(__DIR__) . '/logs/contact-form.log');

// Ensure logs directory exists
if (!file_exists(dirname(__DIR__) . '/logs')) {
    mkdir(dirname(__DIR__) . '/logs', 0755, true);
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
error_log('Request received: ' . $_SERVER['REQUEST_METHOD']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    error_log('Received data: ' . print_r($data, true));
    
    // Validierung
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        error_log('Validation failed: Missing required fields');
        http_response_code(400);
        echo json_encode(['error' => 'Fehlende Pflichtfelder']);
        exit;
    }

    $to = 'kontakt@callflows.de';
    $subject = isset($data['source']) ? 'Anfrage ' . ucfirst($data['source']) : 'Neue Kontaktanfrage';
    error_log('Preparing to send email to: ' . $to);
    
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
        error_log('Email sent successfully');
        echo json_encode(['success' => true]);
    } else {
        error_log('Failed to send email: ' . error_get_last()['message']);
        http_response_code(500);
        echo json_encode(['error' => 'E-Mail konnte nicht gesendet werden']);
    }
} else {
    error_log('Invalid request method: ' . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['error' => 'Methode nicht erlaubt']);
}
?>