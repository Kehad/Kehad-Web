// Your Client ID and Client Secret from Spotify Developer Dashboard
var clientId = "acfc9d182abf48f2843c9047db71dff3";
var clientSecret = "166fe1965a4f480684b7ede47aed5a9e";
export async function fetchToken() {

  const credentials = btoa(`${clientId}:${clientSecret}`);

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();

    if (response.ok) {
      return data.access_token; // Return the access token
    } else {
      console.error("Error requesting token:", data);
      return null; // Return null or handle the error as needed
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null; // Return null in case of error
  }
}

export async function fetchWebApi(token, endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (
    await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=5", "GET")
  ).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({ name, artists }) =>
      `${name} by ${artists.map((artist) => artist.name).join(", ")}`
  )
);