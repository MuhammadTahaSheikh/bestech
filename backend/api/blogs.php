<?php
require_once __DIR__ . '/blog_config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    blog_json(['error' => 'Method not allowed'], 405);
}

try {
    $pdo = blog_pdo();
    $stmt = $pdo->query('
        SELECT id, slug, title, excerpt, content, author, category, cover_image_path, created_at
        FROM blogs
        ORDER BY created_at DESC
    ');

    $rows = $stmt->fetchAll();
    $result = array_map(function ($row) {
        return [
            'id' => (string)$row['id'],
            'slug' => $row['slug'],
            'title' => $row['title'],
            'excerpt' => $row['excerpt'],
            'content' => $row['content'],
            'author' => $row['author'],
            'category' => $row['category'],
            'coverImage' => $row['cover_image_path'] ? cms_public_upload_url($row['cover_image_path']) : '',
            'createdAt' => gmdate('c', strtotime($row['created_at']))
        ];
    }, $rows);

    blog_json($result);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
?>
