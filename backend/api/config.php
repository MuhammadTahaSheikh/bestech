<?php

/**
 * Loads optional local overrides from config.local.php (copy from config.local.php.example).
 */
function loadLocalConfig(): array
{
    $path = __DIR__ . '/config.local.php';
    if (!is_file($path)) {
        return [];
    }

    $config = include $path;
    return is_array($config) ? $config : [];
}

function configValue(string $key, string $default = ''): string
{
    $env = getenv($key);
    if (is_string($env) && $env !== '') {
        return $env;
    }

    $local = loadLocalConfig();
    if (!empty($local[$key]) && is_string($local[$key])) {
        return $local[$key];
    }

    return $default;
}

function getN8nAppointmentWebhookUrl(): string
{
    return trim(configValue('N8N_APPOINTMENT_WEBHOOK_URL'));
}

function getN8nContactWebhookUrl(): string
{
    return trim(configValue('N8N_CONTACT_WEBHOOK_URL'));
}

function getN8nHireWebhookUrl(): string
{
    return trim(configValue('N8N_HIRE_WEBHOOK_URL'));
}

function getN8nCareerWebhookUrl(): string
{
    return trim(configValue('N8N_CAREER_WEBHOOK_URL'));
}
