// Spotify API Credentials (move to .env for production!)
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "acfc9d182abf48f2843c9047db71dff3";
const client_secret = process.env.VITE_SPOTIFY_CLIENT_SECRET || "166fe1965a4f480684b7ede47aed5a9e";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const CURRENT_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists`; 

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

/**
 * Gets a fresh Access Token. 
 */
const getAccessToken = async (refreshToken?: string) => {
  const basic = btoa(`${client_id}:${client_secret}`);

  const params: Record<string, string> = {
    grant_type: refreshToken ? "refresh_token" : "client_credentials",
  };

  if (refreshToken) {
    params.refresh_token = refreshToken;
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params).toString(),
  });

  return response.json();
};

/**
 * Fetches the currently playing track.
 */
export const getNowPlaying = async () => {
  const env_refresh_token = process.env.VITE_SPOTIFY_REFRESH_TOKEN;
  const cookie_refresh_token = getCookie("spotify_refresh_token");
  
  const refresh_token = env_refresh_token || cookie_refresh_token;

  if (!refresh_token) {
    console.warn("getNowPlaying requires a SPOTIFY_REFRESH_TOKEN or logging in.");
    return { requiresLogin: true };
  }

  let access_token = getCookie("spotify_access_token");

  if (!access_token || env_refresh_token) {
    const data = await getAccessToken(refresh_token);
    if (!data.access_token) {
      return { requiresLogin: true };
    }
    access_token = data.access_token;
  }

  const response = await fetch(CURRENT_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });

  if (response.status === 204 || response.status > 400) {
    return null;
  }

  return response.json();
};

/**
 * Fetches a specific playlist by ID.
 * Works with both Refresh Token and Client Credentials.
 */
export const getPlaylist = async (playlistId: string) => {
  // Public playlists can just use client credentials
  const { access_token } = await getAccessToken();

  const response = await fetch(`${PLAYLIST_ENDPOINT}/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) return null;

  return response.json();
};

