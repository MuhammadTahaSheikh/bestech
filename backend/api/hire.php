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

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit();
}

$required_fields = ['name', 'email', 'phone'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field '$field' is required"]);
        exit();
    }
}

$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($input['phone']));
$question = isset($input['question']) ? htmlspecialchars(trim($input['question'])) : '';
$teamMember = isset($input['teamMember']) ? htmlspecialchars(trim($input['teamMember'])) : 'Our Team';
$teamMemberRole = isset($input['teamMemberRole']) ? htmlspecialchars(trim($input['teamMemberRole'])) : 'Expert Professional';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

$n8nPayload = [
    'formType' => 'hire',
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'question' => $question,
    'teamMember' => $teamMember,
    'teamMemberRole' => $teamMemberRole,
    'submittedAt' => date('c'),
];

tryN8nFormSubmit(
    getN8nHireWebhookUrl(),
    $n8nPayload,
    __DIR__ . '/hire_log.txt',
    date('Y-m-d H:i:s') . " - Hire (n8n): $name ($email) — $teamMember\n",
    'Inquiry sent successfully.',
    'Failed to send inquiry. Please try again later.'
);

// Fallback when n8n is not configured (legacy PHP mail)
$to = 'info@bestechvision.com';
$subject = 'New Hire Inquiry - Bestech Vision';
$headers = "From: noreply@bestechvision.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

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
            <h2>New Hire Inquiry</h2>
            <p>Bestech Vision Website</p>
        </div>
        <div class='content'>
            <div class='field'><div class='label'>Name:</div><div class='value'>$name</div></div>
            <div class='field'><div class='label'>Email:</div><div class='value'>$email</div></div>
            <div class='field'><div class='label'>Phone:</div><div class='value'>$phone</div></div>
            <div class='field'><div class='label'>Requested Team Member:</div><div class='value'>$teamMember</div></div>
            <div class='field'><div class='label'>Role:</div><div class='value'>$teamMemberRole</div></div>
            <div class='field'><div class='label'>Project Details / Questions:</div><div class='value'>" . ($question ?: 'Not provided') . "</div></div>
            <div class='field'><div class='label'>Submitted:</div><div class='value'>" . date('Y-m-d H:i:s') . "</div></div>
        </div>
    </div>
</body>
</html>
";

if (mail($to, $subject, $email_body, $headers)) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Inquiry sent successfully.',
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send inquiry. Please try again later.',
    ]);
}
