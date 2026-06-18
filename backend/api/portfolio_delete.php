<?php
require_once __DIR__ . '/admin_auth.php';

admin_require_user();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(['error' => 'Method not allowed'], 405);
}

$payload = json_decode(file_get_contents('php://input'), true);
$id = isset($payload['id']) ? (int)$payload['id'] : 0;
if ($id < 1) {
    blog_json(['error' => 'id is required'], 400);
}

try {
    $pdo = blog_pdo();
    $stmt = $pdo->prepare('SELECT id FROM portfolio_projects WHERE id = :id LIMIT 1');
    $stmt->execute(['id' => $id]);
    if (!$stmt->fetch()) {
        blog_json(['error' => 'not found'], 404);
    }
    $del = $pdo->prepare('DELETE FROM portfolio_projects WHERE id = :id');
    $del->execute(['id' => $id]);
    blog_json(['ok' => true]);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
