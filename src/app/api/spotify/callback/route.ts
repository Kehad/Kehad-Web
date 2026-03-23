import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "acfc9d182abf48f2843c9047db71dff3";
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET || "166fe1965a4f480684b7ede47aed5a9e";
  
  const redirect_uri = `${url.protocol}//${url.host}/api/spotify/callback`;

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }).toString(),
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(data, { status: 400 });
    }

    const cookieStore = await cookies();
    if (data.access_token) {
      cookieStore.set("spotify_access_token", data.access_token, { maxAge: data.expires_in, path: "/" });
    }
    if (data.refresh_token) {
      // Store the refresh token securely in a cookie
      // You can also copy this token from the application cookies to put into your .env file
      cookieStore.set("spotify_refresh_token", data.refresh_token, { maxAge: 60 * 60 * 24 * 365, path: "/" });
    }

    // Redirect back to the home page or wherever the user was
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Error during Spotify token exchange:", error);
    return NextResponse.json({ error: "Failed to exchange token" }, { status: 500 });
  }
}
