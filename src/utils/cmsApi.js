function getApiBase() {
  return (process.env.REACT_APP_API_BASE || '/api').replace(/\/$/, '');
}

export function assetUrl(value) {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith('/')) return value;
  return `${getApiBase()}/${value.replace(/^\/+/, '')}`;
}

const TOKEN_KEY = 'bestech_admin_token';

export function getStoredToken() {
  return typeof localStorage !== 'undefined' ? localStorage.getItem(TOKEN_KEY) || '' : '';
}

export function setStoredToken(token) {
  if (typeof localStorage === 'undefined') return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

function authHeaders() {
  const t = getStoredToken();
  return t ? { Authorization: `Bearer ${t}` } : {};
}

function parseJsonBody(text, requestUrl) {
  const trimmed = text.trimStart();
  if (trimmed.startsWith('<')) {
    throw new Error(`API at ${requestUrl} returned HTML instead of JSON.`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON from ${requestUrl}`);
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

export async function adminLogin(username, password) {
  const url = `${getApiBase()}/admin_login.php`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return parseResponse(res, url);
}

export async function adminLogout() {
  const url = `${getApiBase()}/admin_logout.php`;
  const res = await fetch(url, { method: 'POST', headers: { ...authHeaders() } });
  return parseResponse(res, url);
}

export async function adminMe() {
  const url = `${getApiBase()}/admin_me.php`;
  const res = await fetch(url, { headers: { ...authHeaders() } });
  return parseResponse(res, url);
}

export async function fetchTeamMembers() {
  const url = `${getApiBase()}/team_list.php`;
  const res = await fetch(url);
  return parseResponse(res, url);
}

export function normalizeTeamMemberForTeamPage(raw) {
  const soc = raw.social || {};
  return {
    id: raw.id,
    name: raw.name,
    role: raw.role,
    bio: raw.bio,
    avatar: raw.avatar || '',
    image: raw.image ? assetUrl(raw.image) : undefined,
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    social: {
      linkedin: soc.linkedin || '#',
      twitter: soc.twitter || '#',
      github: soc.github || '#',
      email: soc.email || 'contact@bestechvision.com'
    }
  };
}

export function normalizeTeamMemberForPreview(raw) {
  const base = normalizeTeamMemberForTeamPage(raw);
  const shortName = base.name.split(/\s+/)[0] || base.name;
  return {
    ...base,
    shortName,
    description: base.bio
  };
}

export async function createTeamMember(formData) {
  const url = `${getApiBase()}/team_create.php`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { ...authHeaders() },
    body: formData
  });
  return parseResponse(res, url);
}

export async function deleteTeamMember(id) {
  const url = `${getApiBase()}/team_delete.php`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ id })
  });
  return parseResponse(res, url);
}

export async function updateTeamMember(formData) {
  const url = `${getApiBase()}/team_update.php`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { ...authHeaders() },
    body: formData
  });
  return parseResponse(res, url);
}

export async function fetchPortfolioProjects() {
  const url = `${getApiBase()}/portfolio_list.php`;
  const res = await fetch(url);
  return parseResponse(res, url);
}

export async function createPortfolioProject(formData) {
  const url = `${getApiBase()}/portfolio_create.php`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { ...authHeaders() },
    body: formData
  });
  return parseResponse(res, url);
}

export async function deletePortfolioProject(id) {
  const url = `${getApiBase()}/portfolio_delete.php`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ id })
  });
  return parseResponse(res, url);
}

// Module-level cache — deduplicates the concurrent calls from Navbar + Home
let _servicesCache = null;
let _servicesInflight = null;

export async function fetchCmsServices() {
  if (_servicesCache !== null) return _servicesCache;
  if (_servicesInflight) return _servicesInflight;

  const url = `${getApiBase()}/services_list.php`;
  _servicesInflight = fetch(url)
    .then(res => parseResponse(res, url))
    .then(data => {
      _servicesCache = data;
      _servicesInflight = null;
      return data;
    })
    .catch(err => {
      _servicesInflight = null;
      throw err;
    });

  return _servicesInflight;
}

export function invalidateCmsServicesCache() {
  _servicesCache = null;
  _servicesInflight = null;
}

export async function createCmsService(formData) {
  const url = `${getApiBase()}/services_create.php`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { ...authHeaders() },
    body: formData
  });
  return parseResponse(res, url);
}

export async function deleteCmsService(dbId, slug) {
  const url = `${getApiBase()}/services_delete.php`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ dbId, slug })
  });
  return parseResponse(res, url);
}

export async function updateCmsService(formData) {
  const url = `${getApiBase()}/services_update.php`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { ...authHeaders() },
    body: formData
  });
  return parseResponse(res, url);
}
