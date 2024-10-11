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

// export async function fetchWebApi(token, endpoint, method, body) {
//   const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method,
//     body: JSON.stringify(body),
//   });
//   return await res.json();
// }

// async function getTopTracks() {
//   // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//   return (
//     await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=5", "GET")
//   ).items;
// }

// const topTracks = await getTopTracks();
// console.log(
//   topTracks?.map(
//     ({ name, artists }) =>
//       `${name} by ${artists.map((artist) => artist.name).join(", ")}`
//   )
// );

// Function to make a request to Spotify Web API with hardcoded endpoint for top tracks
// export async function fetchWebApi(token) {
//   const res = await fetch(
//     "https://api.spotify.com/v1/me/player/currently-playing",
//     {
//       headers: {
//         Authorization: `Bearer ${token}`, // Correct template literal for token
//         "Content-Type": "application/json",
//       },
//       method: "GET", // Hardcoded GET method for this specific request
//     }
//   );

//   // Parse and return the response JSON
//   return await res.json();
// }

// // Function to get top tracks
// async function getTopTracks(token) {
//   const data = await fetchWebApi(token); // Fetch data using the hardcoded fetchWebApi
//   return data.items; // Return the top tracks
// }

// // Example usage
// async function displayTopTracks() {
//   // Fetch the token (assuming fetchToken function is implemented)
//   const token = await fetchToken(); // You should replace this with your actual token-fetching logic

//   const topTracks = await getTopTracks(token); // Get top tracks using the token

//   // Log the top tracks with artist names
//   console.log(
//     topTracks?.map(
//       ({ name, artists }) =>
//         `${name} by ${artists.map((artist) => artist.name).join(', ')}`
//     )
//   );
// }

// // Call the function to display the top tracks
// displayTopTracks();


// Function to fetch the currently playing track from Spotify Web API
export async function fetchCurrentlyPlaying(token) {
  const res = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${token}`, // Pass the token
      "Content-Type": "application/json",
    },
    method: "GET", // GET request to fetch currently playing track
  });
    console.log(`token token ${token}`);

  // Check if the response is OK and there is a currently playing track
//   if (res.status === 204 || res.status > 299) {
//       console.log('No content or error with the request');
//       console.log(res);
//     return null;
//   }
  console.log(res)
  // Parse and return the response JSON
  return await res.json();
}

// Function to get currently playing track
async function getCurrentlyPlayingTrack(token) {
  const data = await fetchCurrentlyPlaying(token); // Fetch data using the currently playing endpoint

//   // If no track is currently playing, return null
//   if (!data || !data.item) {
//     console.log('No track is currently playing');
//     return null;
    //   }
    
    console.log(`data ${data}`) ;
//   const { name, artists } = data.item; // Extract track name and artists
//   return `${name} by ${artists.map(artist => artist.name).join(', ')}`; // Return formatted string
}

// Example usage
async function displayCurrentlyPlayingTrack() {
  // Fetch the token (assuming fetchToken function is implemented)
    const token = await fetchToken();
  console.log(`my token ${token}`)  // Replace with actual token-fetching logic

  const trackInfo = await getCurrentlyPlayingTrack(token); // Get currently playing track
    console.log(trackInfo)
  // Check if the token is valid and there is a currently playing track
    
  // Log the currently playing track
  if (trackInfo) {
    console.log(`Currently playing: ${trackInfo}`);
  } else {
    console.log('No track is currently playing');
  }
}


