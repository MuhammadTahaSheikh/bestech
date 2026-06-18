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
$dbId = isset($payload['dbId']) ? (int)$payload['dbId'] : 0;
$slug = trim($payload['slug'] ?? '');
$id = isset($payload['id']) ? (int)$payload['id'] : 0;
if ($id < 1) {
    $id = $dbId;
}

try {
    $pdo = blog_pdo();
    $deleted = 0;
    if ($id > 0) {
        $stmt = $pdo->prepare('DELETE FROM cms_services WHERE id = :id');
        $stmt->execute(['id' => $id]);
        $deleted = $stmt->rowCount();
    }
    if ($deleted < 1 && $slug !== '') {
        $stmt = $pdo->prepare('DELETE FROM cms_services WHERE slug = :s');
        $stmt->execute(['s' => $slug]);
        $deleted = $stmt->rowCount();
    }
    if ($deleted < 1) {
        blog_json(['error' => 'not found'], 404);
    }
    blog_json(['ok' => true]);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
