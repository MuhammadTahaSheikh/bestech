<?php
require_once __DIR__ . '/n8n.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
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
    echo json_encode(['error' => 'Invalid JSON body']);
    exit();
}

$required_fields = ['name', 'email', 'meetingType', 'preferredDate', 'preferredTime'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field '$field' is required"]);
        exit();
    }
}

$name = htmlspecialchars(trim($input['name']));
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$phone = isset($input['phone']) ? htmlspecialchars(trim($input['phone'])) : '';
$company = isset($input['company']) ? htmlspecialchars(trim($input['company'])) : '';
$meetingType = htmlspecialchars(trim($input['meetingType']));
$preferredDate = htmlspecialchars(trim($input['preferredDate']));
$preferredTime = htmlspecialchars(trim($input['preferredTime']));
$duration = isset($input['duration']) ? htmlspecialchars(trim($input['duration'])) : '30 minutes';
$projectDescription = isset($input['projectDescription']) ? htmlspecialchars(trim($input['projectDescription'])) : '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

$n8nPayload = [
    'formType' => 'appointment',
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
    'company' => $company,
    'meetingType' => $meetingType,
    'preferredDate' => $preferredDate,
    'preferredTime' => $preferredTime,
    'duration' => $duration,
    'projectDescription' => $projectDescription,
    'bookedAt' => date('c'),
];

$webhookUrl = getN8nAppointmentWebhookUrl();

if ($webhookUrl !== '') {
    $result = sendToN8nWebhook($webhookUrl, $n8nPayload);

    if ($result['ok']) {
        $log_entry = date('Y-m-d H:i:s') . " - Appointment (n8n): $name ($email) - $meetingType on $preferredDate at $preferredTime\n";
        @file_put_contents(__DIR__ . '/appointment_log.txt', $log_entry, FILE_APPEND | LOCK_EX);

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Appointment booked successfully! A confirmation email will be sent shortly.',
        ]);
        exit();
    }

    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to book appointment. Please try again later.',
        'detail' => $result['error'] ?? 'n8n webhook failed',
    ]);
    exit();
}

// Fallback when n8n is not configured (legacy PHP mail)
$to = 'info@bestechvision.com';
$subject = 'New Appointment Booking - Bestech Vision';
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
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1e40af; }
        .value { margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        .urgent { background: #fef3c7; padding: 10px; border-left: 4px solid #f59e0b; margin: 15px 0; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Appointment Booking</h2>
            <p>Bestech Vision Website</p>
        </div>
        <div class='content'>
            <div class='urgent'>
                <strong>Action Required:</strong> A new appointment has been booked. Please confirm the meeting details with the client.
            </div>
            <div class='field'><div class='label'>Client Name:</div><div class='value'>$name</div></div>
            <div class='field'><div class='label'>Email:</div><div class='value'>$email</div></div>
            <div class='field'><div class='label'>Phone:</div><div class='value'>" . ($phone ?: 'Not provided') . "</div></div>
            <div class='field'><div class='label'>Company:</div><div class='value'>" . ($company ?: 'Not provided') . "</div></div>
            <div class='field'><div class='label'>Meeting Type:</div><div class='value'>$meetingType</div></div>
            <div class='field'><div class='label'>Preferred Date:</div><div class='value'>$preferredDate</div></div>
            <div class='field'><div class='label'>Preferred Time:</div><div class='value'>$preferredTime</div></div>
            <div class='field'><div class='label'>Duration:</div><div class='value'>$duration</div></div>
            <div class='field'><div class='label'>Project Description:</div><div class='value'>" . ($projectDescription ?: 'Not provided') . "</div></div>
            <div class='field'><div class='label'>Booking Time:</div><div class='value'>" . date('Y-m-d H:i:s') . "</div></div>
        </div>
        <div class='footer'>
            <p>This appointment was booked through the Bestech Vision website.</p>
        </div>
    </div>
</body>
</html>
";

if (mail($to, $subject, $email_body, $headers)) {
    $log_entry = date('Y-m-d H:i:s') . " - Appointment: $name ($email) - $meetingType on $preferredDate at $preferredTime\n";
    @file_put_contents(__DIR__ . '/appointment_log.txt', $log_entry, FILE_APPEND | LOCK_EX);

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Appointment booked successfully! We will contact you soon to confirm the details.',
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to book appointment. Please try again later.',
    ]);
}
