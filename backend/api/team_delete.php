<?php
require_once __DIR__ . '/admin_auth.php';

admin_require_user();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(['error' => 'Method not allowed'], 405);
}

$payload = json_decode(file_get_contents('php://input'), true);
if (!is_array($payload)) {
    $payload = [];
}
$id = isset($payload['id']) ? (int)$payload['id'] : 0;
if ($id < 1) {
    blog_json(['error' => 'id is required'], 400);
}

try {
    $pdo = blog_pdo();
    $stmt = $pdo->prepare('SELECT image_path FROM team_members WHERE id = :id LIMIT 1');
    $stmt->execute(['id' => $id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
        blog_json(['error' => 'not found'], 404);
    }
    $del = $pdo->prepare('DELETE FROM team_members WHERE id = :id');
    $del->execute(['id' => $id]);
    if (!empty($row['image_path'])) {
        $path = __DIR__ . '/' . ltrim($row['image_path'], '/');
        if (is_file($path)) {
            @unlink($path);
        }
    }
    blog_json(['ok' => true]);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
