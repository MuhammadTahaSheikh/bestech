<?php

require_once __DIR__ . '/config.php';

/**
 * POST appointment (or other) payload to an n8n Webhook trigger.
 *
 * @return array{ok: bool, status: int, body: string, error?: string}
 */
function sendToN8nWebhook(string $webhookUrl, array $payload): array
{
    if ($webhookUrl === '') {
        return ['ok' => false, 'status' => 0, 'body' => '', 'error' => 'Webhook URL is not configured'];
    }

    $json = json_encode($payload, JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        return ['ok' => false, 'status' => 0, 'body' => '', 'error' => 'Failed to encode payload'];
    }

    if (function_exists('curl_init')) {
        $ch = curl_init($webhookUrl);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $json,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 15,
        ]);
        $body = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($body === false) {
            return ['ok' => false, 'status' => $status, 'body' => '', 'error' => $curlError ?: 'Request failed'];
        }

        return [
            'ok' => $status >= 200 && $status < 300,
            'status' => $status,
            'body' => (string) $body,
            'error' => ($status >= 200 && $status < 300) ? null : ($curlError ?: "HTTP $status"),
        ];
    }

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $json,
            'timeout' => 15,
            'ignore_errors' => true,
        ],
    ]);

    $body = @file_get_contents($webhookUrl, false, $context);
    $status = 0;
    if (isset($http_response_header[0]) && preg_match('/\d{3}/', $http_response_header[0], $m)) {
        $status = (int) $m[0];
    }

    return [
        'ok' => $status >= 200 && $status < 300,
        'status' => $status,
        'body' => $body === false ? '' : (string) $body,
        'error' => ($status >= 200 && $status < 300) ? null : "HTTP $status",
    ];
}

/**
 * POST to n8n when configured; exit on success/failure. Returns false if webhook URL is empty.
 */
function tryN8nFormSubmit(
    string $webhookUrl,
    array $payload,
    string $logFile,
    string $logLine,
    string $successMessage,
    string $errorMessage = 'Failed to submit form. Please try again later.'
): bool {
    if ($webhookUrl === '') {
        return false;
    }

    $result = sendToN8nWebhook($webhookUrl, $payload);

    if ($result['ok']) {
        @file_put_contents($logFile, $logLine, FILE_APPEND | LOCK_EX);

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => $successMessage,
        ]);
        exit();
    }

    http_response_code(500);
    echo json_encode([
        'error' => $errorMessage,
        'detail' => $result['error'] ?? 'n8n webhook failed',
    ]);
    exit();
}
