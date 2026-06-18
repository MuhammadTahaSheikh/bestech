<?php
require_once __DIR__ . '/admin_auth.php';

admin_require_user();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(['error' => 'Method not allowed'], 405);
}

$slugInput = trim($_POST['slug'] ?? '');
$title = trim($_POST['title'] ?? '');
$iconKey = trim($_POST['iconKey'] ?? 'code');
$description = trim($_POST['description'] ?? '');
$featuresRaw = trim($_POST['features'] ?? '');

if ($title === '' || $description === '') {
    blog_json(['error' => 'title and description are required'], 400);
}

$base = $slugInput !== '' ? $slugInput : $title;
$slug = blog_slugify($base);

$features = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $featuresRaw))));

try {
    $pdo = blog_pdo();

    $check = $pdo->prepare('SELECT id FROM cms_services WHERE slug = :s LIMIT 1');
    $unique = $slug;
    $n = 1;
    while (true) {
        $check->execute(['s' => $unique]);
        if (!$check->fetch()) {
            break;
        }
        $unique = $slug . '-' . $n;
        $n++;
    }

    $sort = (int)$pdo->query('SELECT COALESCE(MAX(sort_order), 0) + 1 FROM cms_services')->fetchColumn();

    $ins = $pdo->prepare(
        'INSERT INTO cms_services (slug, title, icon_key, description, features_json, sort_order)
         VALUES (:slug, :title, :icon_key, :description, :features_json, :sort_order)'
    );
    $ins->execute([
        'slug' => $unique,
        'title' => $title,
        'icon_key' => $iconKey !== '' ? $iconKey : 'code',
        'description' => $description,
        'features_json' => json_encode($features),
        'sort_order' => $sort
    ]);

    blog_json(['id' => $unique, 'message' => 'Service added'], 201);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
