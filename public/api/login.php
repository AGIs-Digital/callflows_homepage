<?php
// Simple login endpoint for static hosting (Apache/PHP). Do NOT expose secrets in repo; they are injected on server.
error_reporting(E_ALL);
ini_set('display_errors', 0);
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . (isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '*'));
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'error' => 'Method not allowed']);
  exit();
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || !isset($input['email']) || !isset($input['password'])) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Bad request']);
  exit();
}

$email = strtolower(trim($input['email']));
$password = $input['password'];

// Secrets from environment (injected via server config), NOT from .env in repo
$adminUser = getenv('ADMIN_USERNAME');
$adminPass = getenv('ADMIN_PASSWORD');
$customerUser = getenv('CUSTOMER_USERNAME');
$customerPass = getenv('CUSTOMER_PASSWORD');

$role = null;
if ($adminUser && $adminPass && $email === strtolower($adminUser) && hash_equals($adminPass, $password)) {
  $role = 'admin';
} elseif ($customerUser && $customerPass && $email === strtolower($customerUser) && hash_equals($customerPass, $password)) {
  $role = 'customer';
}

if (!$role) {
  http_response_code(401);
  echo json_encode(['success' => false, 'error' => 'Unauthorized']);
  exit();
}

// Optionally set a HttpOnly session cookie (minimalist, stateless fallback in client anyway)
// Here we just acknowledge success; persistent auth handled by client store.
echo json_encode(['success' => true, 'role' => $role]);
exit();
?>


