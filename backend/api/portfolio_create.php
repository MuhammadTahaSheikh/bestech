<?php
require_once __DIR__ . '/admin_auth.php';

admin_require_user();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(['error' => 'Method not allowed'], 405);
}

$title = trim($_POST['title'] ?? '');
$category = trim($_POST['category'] ?? 'web');
$categoryLabel = trim($_POST['categoryLabel'] ?? '');
$description = trim($_POST['description'] ?? '');
$iconKey = trim($_POST['iconKey'] ?? 'code');
$technologiesRaw = trim($_POST['technologies'] ?? '');
$duration = trim($_POST['duration'] ?? '');
$team = trim($_POST['team'] ?? '');
$featuresRaw = trim($_POST['features'] ?? '');
$liveUrl = trim($_POST['liveUrl'] ?? '#');
$githubUrl = trim($_POST['githubUrl'] ?? '#');

if ($title === '' || $description === '') {
    blog_json(['error' => 'title and description are required'], 400);
}

$allowedCats = ['web', 'realestate', 'extension', 'automation'];
if (!in_array($category, $allowedCats, true)) {
    $category = 'web';
}

$technologies = array_values(array_filter(array_map('trim', explode(',', $technologiesRaw))));
$features = array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $featuresRaw))));

try {
    $pdo = blog_pdo();
    $sort = (int)$pdo->query('SELECT COALESCE(MAX(sort_order), 0) + 1 FROM portfolio_projects')->fetchColumn();

    $ins = $pdo->prepare(
        'INSERT INTO portfolio_projects
        (title, category, category_label, description, icon_key, technologies_json, duration, team_size,
         features_json, live_url, github_url, sort_order)
        VALUES
        (:title, :category, :category_label, :description, :icon_key, :technologies_json, :duration, :team_size,
         :features_json, :live_url, :github_url, :sort_order)'
    );
    $ins->execute([
        'title' => $title,
        'category' => $category,
        'category_label' => $categoryLabel !== '' ? $categoryLabel : ucfirst($category),
        'description' => $description,
        'icon_key' => $iconKey !== '' ? $iconKey : 'code',
        'technologies_json' => json_encode($technologies),
        'duration' => $duration,
        'team_size' => $team,
        'features_json' => json_encode($features),
        'live_url' => $liveUrl !== '' ? $liveUrl : '#',
        'github_url' => $githubUrl !== '' ? $githubUrl : '#',
        'sort_order' => $sort
    ]);

    blog_json(['id' => (string)$pdo->lastInsertId(), 'message' => 'Project added'], 201);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
