import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "993fe9ccf251424583d1b79eae09def1";
  
  const url = new URL(request.url);
  const redirect_uri = `https://kehad-web.onrender.com/api/spotify/callback`;
  
  const scope = "user-read-currently-playing user-read-playback-state";

  const spotifyAuthUrl = new URL("https://accounts.spotify.com/authorize");
  spotifyAuthUrl.searchParams.append("response_type", "code");
  spotifyAuthUrl.searchParams.append("client_id", client_id);
  spotifyAuthUrl.searchParams.append("scope", scope);
  spotifyAuthUrl.searchParams.append("redirect_uri", redirect_uri);

  return NextResponse.redirect(spotifyAuthUrl.toString());
}
