<?php
/**
 * ONE-TIME FIX: Sets password using PHP password_hash (always works with admin_login).
 *
 * 1. Upload this file to your server (same folder as admin_login.php).
 * 2. Visit: admin_apply_credentials.php?confirm=1
 * 3. You should see JSON with ok:true and password_verify_selfcheck:true
 * 4. DELETE this file immediately from the server.
 */
require_once __DIR__ . '/blog_config.php';

header('Content-Type: application/json; charset=utf-8');

if (($_GET['confirm'] ?? '') !== '1') {
    http_response_code(400);
    echo json_encode([
        'error' => 'Add ?confirm=1 to the URL once, then delete admin_apply_credentials.php.',
        'example' => basename(__FILE__) . '?confirm=1'
    ]);
    exit();
}

$username = 'BetsechVision';
$password = 'Limton123@';

try {
    $pdo = blog_pdo();
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $find = $pdo->prepare('SELECT id FROM admin_users WHERE LOWER(TRIM(username)) = LOWER(TRIM(:u)) LIMIT 1');
    $find->execute(['u' => $username]);
    $row = $find->fetch(PDO::FETCH_ASSOC);

    if ($row) {
        $upd = $pdo->prepare('UPDATE admin_users SET password_hash = :h WHERE id = :id');
        $upd->execute(['h' => $hash, 'id' => $row['id']]);
    } else {
        $ins = $pdo->prepare('INSERT INTO admin_users (username, password_hash) VALUES (:u, :h)');
        $ins->execute(['u' => $username, 'h' => $hash]);
    }

    $verifyStmt = $pdo->prepare(
        'SELECT password_hash FROM admin_users WHERE LOWER(TRIM(username)) = LOWER(TRIM(:u)) LIMIT 1'
    );
    $verifyStmt->execute(['u' => $username]);
    $stored = $verifyStmt->fetch(PDO::FETCH_ASSOC);
    $selfcheck = $stored ? password_verify($password, $stored['password_hash']) : false;

    echo json_encode([
        'ok' => true,
        'username' => $username,
        'password_verify_selfcheck' => $selfcheck,
        'next_step' => 'Delete admin_apply_credentials.php from the server, then sign in at /admin/signin'
    ], JSON_PRETTY_PRINT);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
