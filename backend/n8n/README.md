# n8n — Website form workflows

All website forms send data to n8n, which emails **info@bestechvision.com**.

| Form | Workflow file | Webhook path | PHP endpoint |
|------|---------------|--------------|--------------|
| Appointment | `appointment-booking-workflow.json` | `appointment-booking` | `appointment.php` |
| Contact Us / Website Audit | `contact-form-workflow.json` | `contact-form` | `contact.php` |
| Hire Team Member | `hire-inquiry-workflow.json` | `hire-inquiry` | `hire.php` |
| Careers (CV upload) | `career-application-workflow.json` | `career-application` | `career.php` |

## 1. Import workflows

1. Open your n8n dashboard at `https://n8n.bestechvision.com`.
2. For each JSON file above: **Workflows** → **Add workflow** → **⋮** → **Import from file**.
3. Open each workflow and assign the same **SMTP** credential to the email node.

## 2. SMTP credentials (all workflows)

| Setting | Value |
|---------|-------|
| Host | `smtp.hostinger.com` |
| Port | `465` (SSL) or `587` (TLS) |
| User | `info@bestechvision.com` |
| Password | Your email password |

## 3. Email node settings (all workflows)

| Field | Value |
|-------|-------|
| **From Email** | `info@bestechvision.com` (plain text — must match SMTP login) |
| **To Email** | `info@bestechvision.com` |
| **Reply To** | `={{ $json.body.email }}` (contact, hire, appointment) or `={{ $json.email }}` (career, after Code node) |

Never put the client's email in **From Email** — Hostinger returns `553 Sender address rejected`.

## 4. Activate workflows

Toggle each workflow **Active** (Published). Copy each **Production URL** from the Webhook node.

## 5. Connect the website

Create `backend/api/config.local.php` (see `config.local.php.example`):

```php
<?php
return [
    'N8N_APPOINTMENT_WEBHOOK_URL' => 'https://n8n.bestechvision.com/webhook/appointment-booking',
    'N8N_CONTACT_WEBHOOK_URL' => 'https://n8n.bestechvision.com/webhook/contact-form',
    'N8N_HIRE_WEBHOOK_URL' => 'https://n8n.bestechvision.com/webhook/hire-inquiry',
    'N8N_CAREER_WEBHOOK_URL' => 'https://n8n.bestechvision.com/webhook/career-application',
];
```

Upload the same file to your production PHP server. It is gitignored locally.

## 6. Test with curl

```bash
curl -X POST "https://n8n.bestechvision.com/webhook/contact-form" \
  -H "Content-Type: application/json" \
  -d @backend/n8n/test-contact-payload.json

curl -X POST "https://n8n.bestechvision.com/webhook/hire-inquiry" \
  -H "Content-Type: application/json" \
  -d @backend/n8n/test-hire-payload.json

curl -X POST "https://n8n.bestechvision.com/webhook/appointment-booking" \
  -H "Content-Type: application/json" \
  -d @backend/n8n/test-payload.json
```

Career form includes a CV attachment — test via the website careers page or send a payload with `cvBase64` filled in.

## Career workflow note

The career workflow has an extra **Prepare CV attachment** Code node that converts `cvBase64` from the webhook into an email attachment. Reuse the same SMTP credential on the email node.
