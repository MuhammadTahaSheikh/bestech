<?php
require_once __DIR__ . '/admin_auth.php';

admin_require_user();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    blog_json(['error' => 'Method not allowed'], 405);
}

$id = (int)($_POST['id'] ?? 0);
$name = trim($_POST['name'] ?? '');
$role = trim($_POST['role'] ?? '');
$bio = trim($_POST['bio'] ?? '');
$avatar = trim($_POST['avatar'] ?? '');
$skillsRaw = trim($_POST['skills'] ?? '');
$linkedin = trim($_POST['linkedin'] ?? '#');
$twitter = trim($_POST['twitter'] ?? '#');
$github = trim($_POST['github'] ?? '#');
$email = trim($_POST['email'] ?? '');

if ($id <= 0 || $name === '' || $bio === '') {
    blog_json(['error' => 'id, name and bio are required'], 400);
}

$skills = array_values(array_filter(array_map('trim', preg_split('/[,|]\s*/', $skillsRaw) ?: [])));
$skillsJson = json_encode($skills);

try {
    $pdo = blog_pdo();
    $existingStmt = $pdo->prepare('SELECT image_path FROM team_members WHERE id = :id LIMIT 1');
    $existingStmt->execute(['id' => $id]);
    $existing = $existingStmt->fetch();
    if (!$existing) {
        blog_json(['error' => 'Team member not found'], 404);
    }

    $imagePath = $existing['image_path'] ?: null;
    $newUploadPath = null;
    if (!empty($_FILES['photo']) && ($_FILES['photo']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
        $file = $_FILES['photo'];
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
        $dir = cms_upload_dir('team');
        $fileName = 'team_' . time() . '_' . bin2hex(random_bytes(6)) . '.' . $allowed[$mime];
        $targetPath = $dir . '/' . $fileName;
        if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
            blog_json(['error' => 'unable to save uploaded image'], 500);
        }
        $newUploadPath = 'uploads/team/' . $fileName;
        $imagePath = $newUploadPath;
    }

    $upd = $pdo->prepare(
        'UPDATE team_members
         SET name = :name,
             role = :role,
             bio = :bio,
             avatar = :avatar,
             image_path = :image_path,
             skills_json = :skills_json,
             linkedin = :linkedin,
             twitter = :twitter,
             github = :github,
             email = :email
         WHERE id = :id
         LIMIT 1'
    );
    $upd->execute([
        'name' => $name,
        'role' => $role !== '' ? $role : 'Team member',
        'bio' => $bio,
        'avatar' => $avatar !== '' ? $avatar : strtoupper(substr(preg_replace('/\s+/', '', $name), 0, 2)),
        'image_path' => $imagePath,
        'skills_json' => $skillsJson,
        'linkedin' => $linkedin !== '' ? $linkedin : '#',
        'twitter' => $twitter !== '' ? $twitter : '#',
        'github' => $github !== '' ? $github : '#',
        'email' => $email,
        'id' => $id
    ]);

    if ($newUploadPath && !empty($existing['image_path']) && $existing['image_path'] !== $newUploadPath) {
        $oldFile = __DIR__ . '/' . ltrim($existing['image_path'], '/');
        if (is_file($oldFile)) {
            @unlink($oldFile);
        }
    }

    blog_json(['message' => 'Team member updated']);
} catch (Throwable $e) {
    blog_json(['error' => $e->getMessage()], 500);
}
?>
