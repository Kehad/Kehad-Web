"use server";
import { cookies } from "next/headers";

// Spotify API Credentials (move to .env for production!)
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "acfc9d182abf48f2843c9047db71dff3";
const client_secret = process.env.SPOTIFY_CLIENT_SECRET || "166fe1965a4f480684b7ede47aed5a9e";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const CURRENT_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const PLAYLIST_ENDPOINT = `https://api.spotify.com/v1/playlists`; 

/**
 * Gets a fresh Access Token. 
 * If a Refresh Token is available, it uses the refresh_token flow (for user data).
 * Otherwise, it falls back to the client_credentials flow (for public data).
 */
const getAccessToken = async (refreshToken?: string) => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

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
    cache: 'no-store',
  });

  return response.json();
};

/**
 * Fetches the currently playing track.
 * NOTE: This endpoint requires a Refresh Token (User scope). 
 */
export const getNowPlaying = async () => {
  const cookieStore = await cookies();
  const env_refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
  const cookie_refresh_token = cookieStore.get("spotify_refresh_token")?.value;
  
  // Try to use the refresh token from env first, then from the cookie
  const refresh_token = env_refresh_token || cookie_refresh_token;

  if (!refresh_token) {
    console.warn("getNowPlaying requires a SPOTIFY_REFRESH_TOKEN or logging in.");
    return { requiresLogin: true };
  }

  let access_token = cookieStore.get("spotify_access_token")?.value;

  // If there's no access token but we have a refresh token, get a new access token
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

