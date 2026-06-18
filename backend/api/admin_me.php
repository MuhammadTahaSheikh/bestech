<?php
require_once __DIR__ . '/admin_auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    blog_json(['error' => 'Method not allowed'], 405);
}

$user = admin_require_user();
blog_json(['username' => $user['username'], 'id' => (string)$user['id']]);
