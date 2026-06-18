import { getStoredToken, assetUrl } from './cmsApi';

function getApiBase() {
  return (process.env.REACT_APP_API_BASE || '/api').replace(/\/$/, '');
}

function authHeaders() {
  const t = getStoredToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export { assetUrl };

function parseJsonBody(text, requestUrl) {
  const trimmed = text.trimStart();
  if (trimmed.startsWith('<')) {
    throw new Error(
      `Blog API at ${requestUrl} returned HTML (often 404/WP/HTML page), not JSON. ` +
        `Open that URL in your browser — you should see [] or [{"slug":...}], not your website.` +
        ` If you use Env: set REACT_APP_API_BASE=https://YOUR-PHP-subdomain rebuild and redeploy.`
    );
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Blog API returned invalid JSON from ${requestUrl}: ${trimmed.slice(0, 100)}`);
  }
}

async function parseResponse(res, requestUrl) {
  const text = await res.text();
  const data = parseJsonBody(text, requestUrl);

  if (!res.ok) {
    const msg = data?.error || data?.message || res.statusText;
    throw new Error(typeof msg === 'string' ? msg : JSON.stringify(msg));
  }
  return data;
}

export async function fetchBlogs() {
  const url = `${getApiBase()}/blogs.php`;
  const res = await fetch(url);
  return parseResponse(res, url);
}

export async function createBlog(formData) {
  const url = `${getApiBase()}/blog_create.php`;
  const res = await fetch(url, {
    method: 'POST',
    headers: authHeaders(),
    body: formData
  });
  return parseResponse(res, url);
}

export async function updateBlog(formData) {
  const url = `${getApiBase()}/blog_update.php`;
  const res = await fetch(url, {
    method: 'POST',
    headers: authHeaders(),
    body: formData
  });
  return parseResponse(res, url);
}

export async function deleteBlogBySlug(slug) {
  const url = `${getApiBase()}/blog_delete.php`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders()
    },
    body: JSON.stringify({ slug })
  });
  return parseResponse(res, url);
}
