<?php
require_once __DIR__ . '/n8n.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$required_fields = ['fullName', 'email', 'phone', 'position'];
foreach ($required_fields as $field) {
    if (empty($_POST[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field '$field' is required"]);
        exit();
    }
}

if (!isset($_FILES['cv']) || $_FILES['cv']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'CV file is required']);
    exit();
}

$fullName = htmlspecialchars(trim($_POST['fullName']));
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($_POST['phone']));
$position = htmlspecialchars(trim($_POST['position']));
$experience = isset($_POST['experience']) ? htmlspecialchars(trim($_POST['experience'])) : '';
$coverLetter = isset($_POST['coverLetter']) ? htmlspecialchars(trim($_POST['coverLetter'])) : '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

$allowed_extensions = ['pdf', 'doc', 'docx'];
$original_name = $_FILES['cv']['name'];
$extension = strtolower(pathinfo($original_name, PATHINFO_EXTENSION));

if (!in_array($extension, $allowed_extensions, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Only PDF, DOC, and DOCX files are allowed']);
    exit();
}

$max_file_size = 5 * 1024 * 1024;
if ($_FILES['cv']['size'] > $max_file_size) {
    http_response_code(400);
    echo json_encode(['error' => 'CV file must be 5MB or smaller']);
    exit();
}

$upload_dir = __DIR__ . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'cv';
if (!is_dir($upload_dir) && !mkdir($upload_dir, 0755, true)) {
    http_response_code(500);
    echo json_encode(['error' => 'Unable to prepare upload directory']);
    exit();
}

$safe_file_name = preg_replace('/[^a-zA-Z0-9._-]/', '_', basename($original_name));
$stored_file_name = time() . '_' . $safe_file_name;
$stored_file_path = $upload_dir . DIRECTORY_SEPARATOR . $stored_file_name;

if (!move_uploaded_file($_FILES['cv']['tmp_name'], $stored_file_path)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to upload CV']);
    exit();
}

$attachment_mime = 'application/octet-stream';
if ($extension === 'pdf') {
    $attachment_mime = 'application/pdf';
} elseif ($extension === 'doc') {
    $attachment_mime = 'application/msword';
} elseif ($extension === 'docx') {
    $attachment_mime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
}

$cvContents = file_get_contents($stored_file_path);
if ($cvContents === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to read uploaded CV']);
    exit();
}

$n8nPayload = [
    'formType' => 'career',
    'fullName' => $fullName,
    'email' => $email,
    'phone' => $phone,
    'position' => $position,
    'experience' => $experience,
    'coverLetter' => $coverLetter,
    'cvFileName' => $safe_file_name,
    'cvMimeType' => $attachment_mime,
    'cvBase64' => base64_encode($cvContents),
    'submittedAt' => date('c'),
];

tryN8nFormSubmit(
    getN8nCareerWebhookUrl(),
    $n8nPayload,
    __DIR__ . '/career_log.txt',
    date('Y-m-d H:i:s') . " - Career (n8n): $fullName ($email) — $position\n",
    'Application submitted successfully.',
    'Failed to send application. Please try again later.'
);

// Fallback when n8n is not configured (legacy PHP mail)
$to = 'info@bestechvision.com';
$subject = 'New Career Application - Bestech Vision';
$from = 'noreply@bestechvision.com';
$boundary = md5((string) time());
$headers = "From: $from\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$email_body = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f8fafc; }
        .field { margin-bottom: 14px; }
        .label { font-weight: bold; color: #1e40af; }
        .value { margin-top: 4px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Career Application</h2>
            <p>Bestech Vision Website</p>
        </div>
        <div class='content'>
            <div class='field'><div class='label'>Full Name:</div><div class='value'>$fullName</div></div>
            <div class='field'><div class='label'>Email:</div><div class='value'>$email</div></div>
            <div class='field'><div class='label'>Phone:</div><div class='value'>$phone</div></div>
            <div class='field'><div class='label'>Position:</div><div class='value'>$position</div></div>
            <div class='field'><div class='label'>Experience:</div><div class='value'>" . ($experience ?: 'Not provided') . "</div></div>
            <div class='field'><div class='label'>Cover Letter:</div><div class='value'>" . ($coverLetter ?: 'Not provided') . "</div></div>
            <div class='field'><div class='label'>Uploaded CV:</div><div class='value'>$stored_file_name</div></div>
            <div class='field'><div class='label'>Submitted:</div><div class='value'>" . date('Y-m-d H:i:s') . "</div></div>
        </div>
    </div>
</body>
</html>
";

$attachment_content = chunk_split(base64_encode($cvContents));
$message = "--$boundary\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$message .= $email_body . "\r\n";
$message .= "--$boundary\r\n";
$message .= "Content-Type: $attachment_mime; name=\"$safe_file_name\"\r\n";
$message .= "Content-Transfer-Encoding: base64\r\n";
$message .= "Content-Disposition: attachment; filename=\"$safe_file_name\"\r\n\r\n";
$message .= $attachment_content . "\r\n";
$message .= "--$boundary--";

if (!mail($to, $subject, $message, $headers)) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send application email']);
    exit();
}

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Application submitted successfully',
]);
