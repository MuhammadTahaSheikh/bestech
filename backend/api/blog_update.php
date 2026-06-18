<?php
require_once __DIR__ . '/admin_auth.php';

admin_require_user();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(['error' => 'Method not allowed'], 405);
}

$slug = trim($_POST['slug'] ?? '');
$title = trim($_POST['title'] ?? '');
$excerpt = trim($_POST['excerpt'] ?? '');
$content = trim($_POST['content'] ?? '');
$author = trim($_POST['author'] ?? 'Admin');
$category = trim($_POST['category'] ?? 'General');

if ($slug === '' || $title === '' || $excerpt === '' || $content === '') {
    blog_json(['error' => 'slug, title, excerpt, and content are required'], 400);
}

try {
    $pdo = blog_pdo();

    $existingStmt = $pdo->prepare('SELECT id, cover_image_path FROM blogs WHERE slug = :slug LIMIT 1');
    $existingStmt->execute(['slug' => $slug]);
    $existing = $existingStmt->fetch();
    if (!$existing) {
        blog_json(['error' => 'Blog not found'], 404);
    }

    $coverImagePath = $existing['cover_image_path'] ?: null;
    $newUploadPath = null;

    if (!empty($_FILES['coverImage']) && ($_FILES['coverImage']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
        $file = $_FILES['coverImage'];

        if (($file['error'] ?? UPLOAD_ERR_OK) !== UPLOAD_ERR_OK) {
            blog_json(['error' => 'image upload failed'], 400);
        }

        if (($file['size'] ?? 0) > 5 * 1024 * 1024) {
            blog_json(['error' => 'image must be 5MB or less'], 400);
        }

        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->file($file['tmp_name']);
        $allowed = [
            'image/jpeg' => 'jpg',
            'image/png' => 'png',
            'image/webp' => 'webp',
            'image/gif' => 'gif'
        ];

        if (!isset($allowed[$mime])) {
            blog_json(['error' => 'only jpg/png/webp/gif images are allowed'], 400);
        }

        $dir = blog_upload_dir();
        $fileName = 'blog_' . time() . '_' . bin2hex(random_bytes(6)) . '.' . $allowed[$mime];
        $targetPath = $dir . '/' . $fileName;

        if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
            blog_json(['error' => 'unable to save uploaded image'], 500);
        }

        $newUploadPath = 'uploads/blogs/' . $fileName;
        $coverImagePath = $newUploadPath;
    }

    $upd = $pdo->prepare('
        UPDATE blogs
        SET title = :title,
            excerpt = :excerpt,
            content = :content,
            author = :author,
            category = :category,
            cover_image_path = :cover_image_path
        WHERE slug = :slug
        LIMIT 1
    ');
    $upd->execute([
        'title' => $title,
        'excerpt' => $excerpt,
        'content' => $content,
        'author' => $author !== '' ? $author : 'Admin',
        'category' => $category !== '' ? $category : 'General',
        'cover_image_path' => $coverImagePath,
        'slug' => $slug
    ]);

    if ($newUploadPath && !empty($existing['cover_image_path']) && $existing['cover_image_path'] !== $newUploadPath) {
        $oldFile = cms_upload_disk_path($existing['cover_image_path']);
        if ($oldFile !== '' && is_file($oldFile)) {
            @unlink($oldFile);
        }
    }

    blog_json(['message' => 'Blog updated']);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
?>
