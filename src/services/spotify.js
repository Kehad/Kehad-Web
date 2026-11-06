// ==========================================================================
// Spotify Web API & PKCE Authentication Service
// Enables visitor OAuth 2.0 PKCE login, playlist retrieval, and playback
// ==========================================================================

// Default Client ID loaded securely from environment (.env)
export const DEFAULT_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
export const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || '';

// Storage identifier keys configured via environment (.env) with safe defaults
const SPOTIFY_CLIENT_ID_STORAGE_KEY = import.meta.env.VITE_SPOTIFY_CLIENT_ID_KEY;
const SPOTIFY_ACCESS_TOKEN_KEY = import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN_KEY;
const SPOTIFY_REFRESH_TOKEN_KEY = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN_KEY;
const SPOTIFY_EXPIRES_AT_KEY = import.meta.env.VITE_SPOTIFY_EXPIRES_AT_KEY;
const SPOTIFY_VERIFIER_KEY = import.meta.env.VITE_SPOTIFY_VERIFIER_KEY;

export const getClientId = () => {
  return localStorage.getItem(SPOTIFY_CLIENT_ID_STORAGE_KEY) || DEFAULT_CLIENT_ID;
};

export const setClientId = (id) => {
  if (id && id.trim()) {
    localStorage.setItem(SPOTIFY_CLIENT_ID_STORAGE_KEY, id.trim());
  } else {
    localStorage.removeItem(SPOTIFY_CLIENT_ID_STORAGE_KEY);
  }
};

export const getRedirectUri = () => {
  return window.location.origin + window.location.pathname;
};

// ==========================================================================
// PKCE Cryptographic Helpers (Web Crypto API)
// ==========================================================================

const generateRandomString = (length = 64) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], '');
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

const base64UrlEncode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

// ==========================================================================
// OAuth 2.0 PKCE Flow
// ==========================================================================

export const initiateSpotifyLogin = async () => {
  const clientId = getClientId();
  const redirectUri = getRedirectUri();
  const scope = [
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-private',
    'user-read-email',
  ].join(' ');

  const verifier = generateRandomString(64);
  const hashed = await sha256(verifier);
  const challenge = base64UrlEncode(hashed);

  localStorage.setItem(SPOTIFY_VERIFIER_KEY, verifier);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    code_challenge_method: 'S256',
    code_challenge: challenge,
    scope: scope,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const handleSpotifyCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const error = urlParams.get('error');

  if (error) {
    console.error('Spotify Auth Error:', error);
    cleanUrl();
    return { success: false, error };
  }

  if (!code) {
    return { success: false, noCode: true };
  }

  const verifier = localStorage.getItem(SPOTIFY_VERIFIER_KEY);
  if (!verifier) {
    cleanUrl();
    return { success: false, error: 'Missing code verifier' };
  }

  const clientId = getClientId();
  const redirectUri = getRedirectUri();

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        code_verifier: verifier,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error_description || data.error || 'Failed to exchange token');
    }

    saveTokens(data);
    localStorage.removeItem(SPOTIFY_VERIFIER_KEY);
    cleanUrl();
    return { success: true };
  } catch (err) {
    console.error('Token Exchange Failed:', err);
    cleanUrl();
    return { success: false, error: err.message };
  }
};

const cleanUrl = () => {
  const cleanUrl = window.location.origin + window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);
};

const saveTokens = (data) => {
  if (data.access_token) {
    localStorage.setItem(SPOTIFY_ACCESS_TOKEN_KEY, data.access_token);
  }
  if (data.refresh_token) {
    localStorage.setItem(SPOTIFY_REFRESH_TOKEN_KEY, data.refresh_token);
  }
  if (data.expires_in) {
    const expiresAt = Date.now() + data.expires_in * 1000;
    localStorage.setItem(SPOTIFY_EXPIRES_AT_KEY, expiresAt.toString());
  }
};

export const getAccessToken = async () => {
  const token = localStorage.getItem(SPOTIFY_ACCESS_TOKEN_KEY);
  const expiresAt = Number(localStorage.getItem(SPOTIFY_EXPIRES_AT_KEY) || 0);

  if (!token) return null;

  // Refresh if token expires in less than 60 seconds
  if (Date.now() > expiresAt - 60000) {
    return await refreshAccessToken();
  }

  return token;
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem(SPOTIFY_REFRESH_TOKEN_KEY);
  const clientId = getClientId();

  if (!refreshToken) {
    logoutSpotify();
    return null;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      logoutSpotify();
      return null;
    }

    saveTokens(data);
    return data.access_token;
  } catch (err) {
    console.error('Refresh Token Failed:', err);
    logoutSpotify();
    return null;
  }
};

export const logoutSpotify = () => {
  localStorage.removeItem(SPOTIFY_ACCESS_TOKEN_KEY);
  localStorage.removeItem(SPOTIFY_REFRESH_TOKEN_KEY);
  localStorage.removeItem(SPOTIFY_EXPIRES_AT_KEY);
  localStorage.removeItem(SPOTIFY_VERIFIER_KEY);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(SPOTIFY_ACCESS_TOKEN_KEY);
};

// ==========================================================================
// Spotify API Endpoints
// ==========================================================================

export const fetchUserProfile = async () => {
  const token = await getAccessToken();
  if (!token) return null;

  const res = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    if (res.status === 401) logoutSpotify();
    return null;
  }

  return res.json();
};

export const fetchUserPlaylists = async (limit = 20) => {
  const token = await getAccessToken();
  if (!token) return null;

  const res = await fetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    if (res.status === 401) logoutSpotify();
    return null;
  }

  const data = await res.json();
  return data.items || [];
};

// ==========================================================================
// Curated Demo / Fallback Playlists (For instant preview before login)
// ==========================================================================

export const DEMO_PLAYLISTS = [
  {
    id: '37i9dQZF1DXdLEN7aqioXM',
    name: 'Coding & Focus Beats',
    description: 'Chilled beats, lofi study, and deep techno flow for development.',
    tracks: { total: 100 },
    images: [{ url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=300&fit=crop' }],
    uri: 'spotify:playlist:37i9dQZF1DXdLEN7aqioXM',
  },
  {
    id: '37i9dQZF1DX4t95PaoR1To',
    name: 'Synthwave & Cyberpunk Drive',
    description: 'Neon retrosynth, darksynth, and nocturnal electronic energy.',
    tracks: { total: 75 },
    images: [{ url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300&h=300&fit=crop' }],
    uri: 'spotify:playlist:37i9dQZF1DX4t95PaoR1To',
  },
  {
    id: '37i9dQZF1DWZeKCadgRdKQ',
    name: 'Deep Focus Ambient',
    description: 'Atmospheric soundscapes and minimal ambient textures.',
    tracks: { total: 80 },
    images: [{ url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop' }],
    uri: 'spotify:playlist:37i9dQZF1DWZeKCadgRdKQ',
  },
];

