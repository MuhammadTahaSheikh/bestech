<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (empty($input['email'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Email is required']);
    exit();
}

// Sanitize input
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

// Check if email already exists
$subscribers_file = 'newsletter_subscribers.txt';
$subscribers = [];
if (file_exists($subscribers_file)) {
    $subscribers = json_decode(file_get_contents($subscribers_file), true) ?: [];
}

if (in_array($email, $subscribers)) {
    http_response_code(409);
    echo json_encode([
        'error' => 'Email already subscribed to newsletter'
    ]);
    exit();
}

// Add email to subscribers list
$subscribers[] = $email;
file_put_contents($subscribers_file, json_encode($subscribers, JSON_PRETTY_PRINT));

// Send confirmation email
$to = $email;
$subject = 'Welcome to BestechSolz Vision Newsletter!';
$headers = "From: newsletter@bestechsolz.com\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$email_body = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f8fafc; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Welcome to BestechSolz Vision!</h2>
        </div>
        <div class='content'>
            <p>Thank you for subscribing to our newsletter!</p>
            <p>You'll receive updates about:</p>
            <ul>
                <li>Latest technology trends</li>
                <li>New services and solutions</li>
                <li>Company news and updates</li>
                <li>Exclusive offers and promotions</li>
            </ul>
            <p>We're excited to keep you informed about our latest developments!</p>
        </div>
        <div class='footer'>
            <p>BestechSolz Vision - Your Trusted IT Solutions Partner</p>
        </div>
    </div>
</body>
</html>
";

// Send confirmation email
mail($to, $subject, $email_body, $headers);

// Notify admin
$admin_email = 'mtahasheikh750@gmail.com';
$admin_subject = 'New Newsletter Subscription - BestechSolz Vision';
$admin_body = "New newsletter subscription: $email\nTime: " . date('Y-m-d H:i:s');
mail($admin_email, $admin_subject, $admin_body);

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Successfully subscribed to newsletter!'
]);
?>
