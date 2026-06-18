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

function cms_storage_root() {
    $apiDir = __DIR__;
    $webRoot = dirname($apiDir);

    // Hostinger / production: keep uploads outside public_html so deploys don't delete them.
    if (is_dir($webRoot . '/static') || is_file($webRoot . '/index.html')) {
        $persistent = dirname($webRoot) . '/cms-uploads';
        if (!is_dir($persistent)) {
            @mkdir($persistent, 0755, true);
        }
        if (is_dir($persistent) && is_writable($persistent)) {
            return $persistent;
        }
        return $webRoot;
    }

    // Local dev: PHP in backend/api, CRA serves public/.
    $publicRoot = dirname($webRoot) . '/public';
    if (is_dir($publicRoot)) {
        return $publicRoot;
    }

    return $webRoot;
}

/** @deprecated use cms_storage_root() */
function cms_site_root() {
    return cms_storage_root();
}

function cms_upload_disk_path($relativePath) {
    if ($relativePath === '' || $relativePath === null) {
        return '';
    }
    $path = cms_upload_relative_path($relativePath);
    if ($path === '') {
        return '';
    }

    $candidates = [
        cms_storage_root() . '/' . $path,
        cms_storage_root() . '/uploads/' . $path,
        dirname(__DIR__) . '/uploads/' . $path,
    ];

    foreach ($candidates as $candidate) {
        if (is_file($candidate)) {
            return $candidate;
        }
    }

    return $candidates[0];
}

function cms_upload_relative_path($relativePath) {
    if ($relativePath === '' || $relativePath === null) {
        return '';
    }
    $path = ltrim((string) $relativePath, '/');
    if (strpos($path, 'api/uploads/') === 0) {
        $path = substr($path, 4);
    }
    if (strpos($path, 'uploads/') === 0) {
        $path = substr($path, 8);
    }
    return $path;
}

function cms_public_upload_url($relativePath) {
    $path = cms_upload_relative_path($relativePath);
    if ($path === '') {
        return '';
    }
    return '/api/media.php?f=' . rawurlencode($path);
}

function blog_upload_dir() {
    return cms_upload_dir('blogs');
}

function cms_upload_dir($subdir) {
    $dir = cms_storage_root() . '/' . trim($subdir, '/');
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return $dir;
}
?>
