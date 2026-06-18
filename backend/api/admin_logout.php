<?php
require_once __DIR__ . '/admin_auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(['error' => 'Method not allowed'], 405);
}

$token = admin_token_from_request();
if ($token === '') {
    blog_json(['error' => 'Missing authorization token'], 401);
}

try {
    $pdo = blog_pdo();
    $hash = admin_hash_token($token);
    $del = $pdo->prepare('DELETE FROM admin_sessions WHERE token_hash = :h');
    $del->execute(['h' => $hash]);
    blog_json(['ok' => true]);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
