function getApiBase() {
  return (process.env.REACT_APP_API_BASE || '/api').replace(/\/$/, '');
}

async function parseResponse(res, requestUrl) {
  const text = await res.text();
  const trimmed = text.trimStart();

  if (trimmed.startsWith('<')) {
    throw new Error(`API at ${requestUrl} returned HTML instead of JSON.`);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON from ${requestUrl}`);
  }

  if (!res.ok || data?.success === false) {
    const msg = data?.error || data?.message || res.statusText || 'Request failed';
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
  }

  return data;
}

async function postJson(endpoint, payload) {
  const url = `${getApiBase()}/${endpoint}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return parseResponse(res, url);
}

async function postFormData(endpoint, formData) {
  const url = `${getApiBase()}/${endpoint}`;
  const res = await fetch(url, {
    method: 'POST',
    body: formData
  });
  return parseResponse(res, url);
}

export function submitAppointment(payload) {
  return postJson('appointment.php', payload);
}

export function submitContact(payload) {
  return postJson('contact.php', payload);
}

export function submitHire(payload) {
  return postJson('hire.php', payload);
}

export function submitCareer(formData) {
  return postFormData('career.php', formData);
}
