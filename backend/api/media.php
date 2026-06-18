<?php
require_once __DIR__ . '/blog_config.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method !== 'GET' && $method !== 'HEAD') {
    http_response_code(405);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Method not allowed';
    exit();
}

$file = isset($_GET['f']) ? (string) $_GET['f'] : '';
$file = str_replace(['..', '\\', "\0"], '', $file);
$file = ltrim($file, '/');

if ($file === '' || !preg_match('#^(team|blogs)/[a-zA-Z0-9._-]+$#', $file)) {
    http_response_code(400);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Invalid path';
    exit();
}

$path = cms_upload_disk_path('uploads/' . $file);

if (!is_file($path)) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo 'Not found';
    exit();
}

$ext = strtolower(pathinfo($path, PATHINFO_EXTENSION));
$mimes = [
    'jpg' => 'image/jpeg',
    'jpeg' => 'image/jpeg',
    'png' => 'image/png',
    'gif' => 'image/gif',
    'webp' => 'image/webp',
    'avif' => 'image/avif',
];
$mime = $mimes[$ext] ?? 'application/octet-stream';

header('Content-Type: ' . $mime);
header('Cache-Control: public, max-age=86400');
header('Content-Length: ' . (string) filesize($path));

if ($method === 'GET') {
    readfile($path);
}
exit();
