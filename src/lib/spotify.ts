"use server";

// Spotify API Credentials (move to .env for production!)
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "acfc9d182abf48f2843c9047db71dff3";
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || "166fe1965a4f480684b7ede47aed5a9e";
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN; // Required for user-private data

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const CURRENT_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists`; // /v1/playlists/{playlist_id}

/**
 * Gets a fresh Access Token using the Refresh Token.
 */
const getAccessToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token || "",
    }).toString(),
    cache: 'no-store',
  });

  return response.json();
};

/**
 * Fetches the currently playing track.
 */
export const getNowPlaying = async () => {
  if (!refresh_token) return null;

  const { access_token } = await getAccessToken();

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
 */
export const getPlaylist = async (playlistId: string) => {
  let token;

  if (refresh_token) {
    const { access_token } = await getAccessToken();
    token = access_token;
  } else {
    // Fallback to client credentials for public playlists
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }).toString(),
    });
    const data = await response.json();
    token = data.access_token;
  }

  const response = await fetch(`${PLAYLIST_ENDPOINT}/${playlistId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) return null;

  return response.json();
};
