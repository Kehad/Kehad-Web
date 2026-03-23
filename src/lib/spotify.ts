"use server";

// Spotify API Credentials (move to .env for production!)
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "acfc9d182abf48f2843c9047db71dff3";
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || "166fe1965a4f480684b7ede47aed5a9e";
// const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN; // Required for user-private data

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const CURRENT_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists`; // /v1/playlists/{playlist_id}

/**
 * Gets a fresh Access Token. 
 * If a Refresh Token is available, it uses the refresh_token flow (for user data).
 * Otherwise, it falls back to the client_credentials flow (for public data).
 */
const getAccessToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  const params: Record<string, string> = {
    grant_type: "client_credentials",
    // grant_type: refresh_token ? "refresh_token" : "client_credentials",
  };

  // if (refresh_token) {
  //   params.refresh_token = refresh_token;
  // }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params).toString(),
    cache: 'no-store',
  });

  return response.json();
};

/**
 * Fetches the currently playing track.
 * NOTE: This endpoint requires a Refresh Token (User scope). 
 */
export const getNowPlaying = async () => {
  // if (!refresh_token) {
  //   console.warn("getNowPlaying requires a SPOTIFY_REFRESH_TOKEN.");
  //   return null;
  // }
  console.log("client_id",client_id);
  console.log("client_secret",client_secret);
  

  const { access_token } = await getAccessToken();
  console.log("access_token",access_token);

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
