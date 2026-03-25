import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "993fe9ccf251424583d1b79eae09def1";
  
  const redirect_uri = "https://kehad-web.onrender.com/api/spotify/callback"
  
  
  // const scope = "user-read-currently-playing user-read-playback-state";

  // const spotifyAuthUrl = new URL("https://accounts.spotify.com/authorize");
  // spotifyAuthUrl.searchParams.append("response_type", "code");
  // spotifyAuthUrl.searchParams.append("client_id", client_id);
  // spotifyAuthUrl.searchParams.append("scope", scope);
  // spotifyAuthUrl.searchParams.append("redirect_uri", redirect_uri);


  const scope = 'user-top-read user-read-recently-played';
    // const redirect_uri = 'https://kehad-web.onrender.com/api/spotify/callback'; // Must match your Spotify Dashboard

    const auth_url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

    // Redirect the user to log in to Spotify
    // window.location.href = auth_url;

  // return NextResponse.redirect(spotifyAuthUrl.toString());
  return NextResponse.redirect(auth_url);
}
