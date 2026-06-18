<?php
require_once __DIR__ . '/admin_auth.php';

admin_require_user();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(['error' => 'Method not allowed'], 405);
}

$payload = json_decode(file_get_contents('php://input'), true);
$slug = trim($payload['slug'] ?? ($_POST['slug'] ?? ''));

if ($slug === '') {
    blog_json(['error' => 'slug is required'], 400);
}

try {
    $pdo = blog_pdo();

    $find = $pdo->prepare('SELECT id, cover_image_path FROM blogs WHERE slug = :slug LIMIT 1');
    $find->execute(['slug' => $slug]);
    $row = $find->fetch();

    if (!$row) {
        blog_json(['error' => 'blog not found'], 404);
    }

    $del = $pdo->prepare('DELETE FROM blogs WHERE id = :id');
    $del->execute(['id' => $row['id']]);

    if (!empty($row['cover_image_path'])) {
        $filePath = cms_upload_disk_path($row['cover_image_path']);
        if ($filePath !== '' && is_file($filePath)) {
            @unlink($filePath);
        }
    }

    blog_json(['ok' => true]);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
?>
