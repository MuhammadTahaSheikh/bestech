<?php
/**
 * One-time setup: creates the first admin user when the admin_users table is empty.
 * POST JSON: { "username": "admin", "password": "your-secure-password" }
 * DELETE this file after your admin account exists.
 */
require_once __DIR__ . '/blog_config.php';

header('Content-Type: text/html; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Create admin</title></head><body>';
    echo '<h1>First-time admin setup</h1><p>Use POST with JSON body, or submit this form.</p>';
    echo '<form method="post"><label>Username <input name="username" value="BetsechVision" required></label><br>';
    echo '<label>Password <input name="password" type="password" minlength="8" required></label><br>';
    echo '<button type="submit">Create admin</button></form>';
    echo '<p><strong>Delete seed_admin.php from the server after creating your account.</strong></p>';
    echo '</body></html>';
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(['error' => 'Use GET for the form or POST to create'], 405);
}

$payload = [];
$ct = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($ct, 'application/json') !== false) {
    $payload = json_decode(file_get_contents('php://input'), true);
    if (!is_array($payload)) {
        $payload = [];
    }
} else {
    $payload = [
        'username' => $_POST['username'] ?? '',
        'password' => $_POST['password'] ?? ''
    ];
}

$username = trim($payload['username'] ?? '');
$password = (string)($payload['password'] ?? '');

if ($username === '' || strlen($password) < 8) {
    blog_json(['error' => 'username required and password must be at least 8 characters'], 400);
}

try {
    $pdo = blog_pdo();
    $count = (int)$pdo->query('SELECT COUNT(*) FROM admin_users')->fetchColumn();
    if ($count > 0) {
        blog_json(['error' => 'Admin user already exists. Remove seed_admin.php.'], 403);
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare('INSERT INTO admin_users (username, password_hash) VALUES (:u, :h)');
    $stmt->execute(['u' => $username, 'h' => $hash]);

    header('Content-Type: application/json');
    echo json_encode(['ok' => true, 'username' => $username, 'note' => 'Delete seed_admin.php now.']);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
