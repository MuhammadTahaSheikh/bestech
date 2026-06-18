<?php
require_once __DIR__ . '/admin_auth.php';

admin_require_user();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(['error' => 'Method not allowed'], 405);
}

$dbId = (int)($_POST['dbId'] ?? 0);
$slugInput = trim($_POST['slug'] ?? '');
$title = trim($_POST['title'] ?? '');
$iconKey = trim($_POST['iconKey'] ?? 'code');
$description = trim($_POST['description'] ?? '');
$featuresRaw = trim($_POST['features'] ?? '');

if ($dbId <= 0 || $title === '' || $description === '') {
    blog_json(['error' => 'dbId, title and description are required'], 400);
}

$features = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $featuresRaw))));

try {
    $pdo = blog_pdo();
    $existingStmt = $pdo->prepare('SELECT id, slug FROM cms_services WHERE id = :id LIMIT 1');
    $existingStmt->execute(['id' => $dbId]);
    $existing = $existingStmt->fetch();
    if (!$existing) {
        blog_json(['error' => 'Service not found'], 404);
    }

    $finalSlug = $existing['slug'];
    if ($slugInput !== '') {
        $candidate = blog_slugify($slugInput);
        $check = $pdo->prepare('SELECT id FROM cms_services WHERE slug = :slug AND id <> :id LIMIT 1');
        $check->execute([
            'slug' => $candidate,
            'id' => $dbId
        ]);
        if ($check->fetch()) {
            blog_json(['error' => 'Slug already exists'], 400);
        }
        $finalSlug = $candidate;
    }

    $upd = $pdo->prepare(
        'UPDATE cms_services
         SET slug = :slug,
             title = :title,
             icon_key = :icon_key,
             description = :description,
             features_json = :features_json
         WHERE id = :id
         LIMIT 1'
    );
    $upd->execute([
        'slug' => $finalSlug,
        'title' => $title,
        'icon_key' => $iconKey !== '' ? $iconKey : 'code',
        'description' => $description,
        'features_json' => json_encode($features),
        'id' => $dbId
    ]);

    blog_json(['message' => 'Service updated', 'slug' => $finalSlug]);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
?>
