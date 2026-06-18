<?php
require_once __DIR__ . '/blog_config.php';

function admin_token_from_request() {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/Bearer\s+(\S+)/i', $auth, $m)) {
        return $m[1];
    }
    return trim($_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '');
}

function admin_hash_token($plain) {
    return hash('sha256', $plain);
}

/**
 * Validates Bearer token and returns ['id' => int, 'username' => string] or exits 401.
 */
function admin_require_user() {
    $token = admin_token_from_request();
    if ($token === '') {
        blog_json(['error' => 'Missing authorization token'], 401);
    }

    $pdo = blog_pdo();
    $hash = admin_hash_token($token);
    $stmt = $pdo->prepare(
        'SELECT u.id, u.username
         FROM admin_sessions s
         INNER JOIN admin_users u ON u.id = s.admin_user_id
         WHERE s.token_hash = :h AND s.expires_at > UTC_TIMESTAMP()
         LIMIT 1'
    );
    $stmt->execute(['h' => $hash]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        blog_json(['error' => 'Invalid or expired session'], 401);
    }
    return [
        'id' => (int)$row['id'],
        'username' => $row['username']
    ];
}
