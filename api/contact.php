<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validierung
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Fehlende Pflichtfelder']);
        exit;
    }

    $to = 'kontakt@callflows.de';
    $subject = isset($data['source']) ? 'Anfrage ' . ucfirst($data['source']) : 'Neue Kontaktanfrage';
    
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
        echo json_encode(['success' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'E-Mail konnte nicht gesendet werden']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Methode nicht erlaubt']);
}
?>