const client_id = '993fe9ccf251424583d1b79eae09def1';
// NEVER expose your client_secret in client-side code! Move this to your Next.js backend (e.g., .env files).
// const client_secret = '3acb5762008f4cbe847cda1850ebcdea';

// 1. Function to initiate the login flow
function getToken() {
    const scope = 'user-top-read user-read-recently-played';
    const redirect_uri = 'https://kehad-web.onrender.com/api/spotify/callback'; // Must match your Spotify Dashboard

    const auth_url = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

    // Redirect the user to log in to Spotify
    window.location.href = auth_url;
}

// -----------------------------------------------------------------------
// The code below should ideally be moved to your Next.js application 
// (or used after you've implemented the Implicit Grant flow).
// -----------------------------------------------------------------------

/*
async function fetchWebApi(endpoint, method, body, token) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: body ? JSON.stringify(body) : undefined
    });
    return await res.json();
}

async function getTopTracks(token) {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi('/v1/me/player/recently-played', 'GET', null, token));
}

// Example usage once you have the token:
// const topTracks = await getTopTracks(token);
// console.log("topTracks", topTracks);
*/