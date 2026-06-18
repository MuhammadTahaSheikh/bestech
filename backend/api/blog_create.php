<?php
require_once __DIR__ . '/admin_auth.php';

admin_require_user();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(['error' => 'Method not allowed'], 405);
}

$title = trim($_POST['title'] ?? '');
$excerpt = trim($_POST['excerpt'] ?? '');
$content = trim($_POST['content'] ?? '');
$author = trim($_POST['author'] ?? 'Admin');
$category = trim($_POST['category'] ?? 'General');

if ($title === '' || $excerpt === '' || $content === '') {
    blog_json(['error' => 'title, excerpt, and content are required'], 400);
}

$coverImagePath = null;

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

    $coverImagePath = 'uploads/blogs/' . $fileName;
}

try {
    $pdo = blog_pdo();
    $slug = blog_unique_slug($pdo, $title);

    $insert = $pdo->prepare('
        INSERT INTO blogs (slug, title, excerpt, content, author, category, cover_image_path)
        VALUES (:slug, :title, :excerpt, :content, :author, :category, :cover_image_path)
    ');
    $insert->execute([
        'slug' => $slug,
        'title' => $title,
        'excerpt' => $excerpt,
        'content' => $content,
        'author' => $author !== '' ? $author : 'Admin',
        'category' => $category !== '' ? $category : 'General',
        'cover_image_path' => $coverImagePath
    ]);

    $id = $pdo->lastInsertId();
    $select = $pdo->prepare('
        SELECT id, slug, title, excerpt, content, author, category, cover_image_path, created_at
        FROM blogs
        WHERE id = :id
        LIMIT 1
    ');
    $select->execute(['id' => $id]);
    $row = $select->fetch();

    blog_json([
        'id' => (string)$row['id'],
        'slug' => $row['slug'],
        'title' => $row['title'],
        'excerpt' => $row['excerpt'],
        'content' => $row['content'],
        'author' => $row['author'],
        'category' => $row['category'],
        'coverImage' => $row['cover_image_path'] ? cms_public_upload_url($row['cover_image_path']) : '',
        'createdAt' => gmdate('c', strtotime($row['created_at']))
    ], 201);
} catch (Throwable $e) {
    if ($coverImagePath) {
        $uploaded = cms_upload_disk_path($coverImagePath);
        if ($uploaded !== '' && is_file($uploaded)) {
            @unlink($uploaded);
        }
    }
    blog_json(['error' => $e->getMessage()], 500);
}
?>
