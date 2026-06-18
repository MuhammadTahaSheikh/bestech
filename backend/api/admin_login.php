<?php
require_once __DIR__ . '/admin_auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(['error' => 'Method not allowed'], 405);
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);
if (!is_array($payload)) {
    $payload = [];
}

$username = trim($payload['username'] ?? '');
$password = (string)($payload['password'] ?? '');

if ($username === '' || $password === '') {
    blog_json(['error' => 'username and password are required'], 400);
}

try {
    $pdo = blog_pdo();
    $stmt = $pdo->prepare(
        'SELECT id, username, password_hash FROM admin_users WHERE LOWER(TRIM(username)) = LOWER(TRIM(:u)) LIMIT 1'
    );
    $stmt->execute(['u' => $username]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        blog_json(['error' => 'Invalid username or password'], 401);
    }

    $hashStored = (string)($row['password_hash'] ?? '');
    if ($hashStored === '' || !password_verify($password, $hashStored)) {
        blog_json(['error' => 'Invalid username or password'], 401);
    }

    $username = $row['username'];

    $token = bin2hex(random_bytes(32));
    $tokenHash = admin_hash_token($token);
    $expires = (new DateTimeImmutable('now', new DateTimeZone('UTC')))->modify('+30 days')->format('Y-m-d H:i:s');

    $ins = $pdo->prepare(
        'INSERT INTO admin_sessions (admin_user_id, token_hash, expires_at) VALUES (:uid, :th, :ex)'
    );
    $ins->execute([
        'uid' => $row['id'],
        'th' => $tokenHash,
        'ex' => $expires
    ]);

    blog_json([
        'token' => $token,
        'username' => (string)$username,
        'expiresAt' => gmdate('c', strtotime($expires . ' UTC'))
    ]);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
