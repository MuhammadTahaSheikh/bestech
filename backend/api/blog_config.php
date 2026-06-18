<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Token');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

date_default_timezone_set('UTC');

/*
 * Copy this file for production and update DB credentials.
 * On Hostinger shared hosting, use your full prefixed DB name/user.
 */
const BLOG_DB_HOST = 'localhost';
const BLOG_DB_NAME = 'u916710688_bestechvision';
const BLOG_DB_USER = 'u916710688_best_user';
const BLOG_DB_PASS = 'Limton123@';
const BLOG_DB_CHARSET = 'utf8mb4';

function blog_json($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit();
}

function blog_pdo() {
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = 'mysql:host=' . BLOG_DB_HOST . ';dbname=' . BLOG_DB_NAME . ';charset=' . BLOG_DB_CHARSET;
    $pdo = new PDO($dsn, BLOG_DB_USER, BLOG_DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    return $pdo;
}

function blog_slugify($value) {
    $value = strtolower(trim((string)$value));
    $value = preg_replace('/[^a-z0-9\s-]/', '', $value);
    $value = preg_replace('/\s+/', '-', $value);
    $value = preg_replace('/-+/', '-', $value);
    return $value ?: ('blog-' . time());
}

function blog_unique_slug($pdo, $title) {
    $base = blog_slugify($title);
    $slug = $base;
    $index = 1;

    $query = $pdo->prepare('SELECT id FROM blogs WHERE slug = :slug LIMIT 1');
    while (true) {
        $query->execute(['slug' => $slug]);
        if (!$query->fetch()) {
            return $slug;
        }
        $slug = $base . '-' . $index;
        $index++;
    }
}

function blog_upload_dir() {
    $dir = __DIR__ . '/uploads/blogs';
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return $dir;
}

function cms_upload_dir($subdir) {
    $dir = __DIR__ . '/uploads/' . trim($subdir, '/');
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return $dir;
}
?>
