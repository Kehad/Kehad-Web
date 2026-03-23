// import { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import MusicPlayer from "../home/MusicPlayer";
// import Toast from "./toast";

// const CLIENT_ID = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
// const CLIENT_SECRET = import.meta.env.VITE_REACT_APP_SPOTIFY_CLIENT_SECRET;
// // const REDIRECT_URI = "https://kehad.onrender.com"; // Change this to your app's redirect URI
// const REDIRECT_URI =  import.meta.env.VITE_APP_SPOTIFY_REDIRECT_URI || "https://localhost:5173/"; // Change this to your app's redirect URI
// // const REDIRECT_URI = "https://kehad.onrender.com" ; // Change this to your app's redirect URI
// const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
// const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
// const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
// const CURRENT_TRACK_ENDPOINT =
//   "https://api.spotify.com/v1/me/player/currently-playing";

// const SpotifyPlaylist = () => {
//   const [token, setToken] = useState("");
//   const [playlists, setPlaylists] = useState([]);
//   const [currentTrack, setCurrentTrack] = useState(null);
//   const [showToast, setShowToast] = useState(false);

//   console.log(
//     "Client ID:",
//    CLIENT_ID,
//   );

//   useEffect(() => {
//   const code = new URLSearchParams(window.location.search).get("code");

//   if (code) {
//     fetch(`http://localhost:3000/api/spotify/token?code=${code}`)
//       .then(res => res.json())
//       .then(data => {
//         localStorage.setItem("spotify_token", data.access_token);
//         setToken(data.access_token);
//       });
//   }
// }, []);

//   useEffect(() => {
//     if (token && !currentTrack) {
//       toast.info("You are logged in but no current track is playing on Spotify.");
//     }
//   }, [token, currentTrack]);



//   const getCurrentTrack = async () => {
//     if (!token) return;
//     console.log("Fetching current track...");
//     try {
//       const response = await fetch(CURRENT_TRACK_ENDPOINT, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(response)
//       const data = await response.json();
//       setCurrentTrack(data.item || null);
//     } catch (error) {
//       console.error("Error fetching current track:", error);
//     }
//   };

//   return (
//     <div>
//       {/* {token && <ToastContainer />} */}
//        <ToastContainer />
//       {!token && (
//         <Toast
//           message="Login to your spotify account"
//           onClose={() => setShowToast(false)}
//         />
//       )}
//       {token && !currentTrack && (
//         <Toast
//           message="You are logged in but no current track is playing on Spotify."
//           onClose={() => setShowToast(false)}
//         />
//       )}
//       {!token ? (
//         <a
//           href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=playlist-read-private user-read-currently-playing user-read-playback-state`}
//           className="bg-[#DFFEE2] dark:text-black text-black hover:text-white p-3 rounded-full border-[#dffee2] border-2 hover:border-2 hover:border-[#dffee2] hover:bg-transparent"
//         >
//           Login to Spotify
//         </a>
//       ) : (
//         <>
//           {/* <button onClick={getPlaylists}>Get Playlists</button> */}
//           {!currentTrack ? (
//             <button
//               className="bg-[#DFFEE2] dark:text-black text-black hover:text-white p-3 rounded-full border-[#dffee2] border-2 hover:border-2 hover:border-[#dffee2] hover:bg-transparent"
//               onClick={getCurrentTrack}
//             >
//               Get Current Your Track
//             </button>
//           ) : (
//             <>
//               <ul>
//                 {playlists.map((playlist) => (
//                   <li key={playlist.id}>{playlist.name}</li>
//                 ))}
//               </ul>
//               <MusicPlayer track={currentTrack} />
//             </>
//           )}
//           {/* {currentTrack && (
//             <div>
//               <h3>Now Playing:</h3>
//               <p>
//                 {currentTrack.name} -{" "}
//                 {currentTrack.artists.map((artist) => artist.name).join(", ")}
//               </p>
//               <img
//                 src={currentTrack.album.images[0].url}
//                 alt={currentTrack.name}
//                 width="100"
//               />
//             </div>
//           )} */}
//         </>
//       )}
//     </div>
//   );
// };

// export default SpotifyPlaylist;

"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MusicPlayer from "@/app/home/modal/MusicPlayer"; // Use @ alias for cleaner imports
import Toast from "./toast";

// Use NEXT_PUBLIC_ prefix so these are available in the browser
const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

// Real Spotify Endpoints (Ensure these are correct)
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const CURRENT_TRACK_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

const SpotifyPlaylist = () => {
  const [token, setToken] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Hydration fix: Ensure code only runs on client
  useEffect(() => {
    setMounted(true);
    const storedToken = localStorage.getItem("spotify_token");
    if (storedToken) setToken(storedToken);
  }, []);

  // 2. Handle the Auth Code exchange
  const handleAuthCode = useCallback(async (code: string) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/spotify/token?code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI!)}`
      );
      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem("spotify_token", data.access_token);
        setToken(data.access_token);
        // Clean URL without full page reload
        router.replace("/", { scroll: false });
      }
    } catch (err) {
      console.error("Token exchange failed:", err);
      toast.error("Failed to authenticate with Spotify");
    }
  }, [router]);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code && !token) {
      handleAuthCode(code);
    }
  }, [searchParams, token, handleAuthCode]);

  // 3. Fetch current track logic
  const getCurrentTrack = async () => {
    if (!token) return;

    try {
      const response = await fetch(CURRENT_TRACK_ENDPOINT, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 204) {
        toast.info("No track is currently playing.");
        setCurrentTrack(null);
        return;
      }

      if (response.status === 401) {
        // Token likely expired
        localStorage.removeItem("spotify_token");
        setToken(null);
        toast.error("Session expired. Please login again.");
        return;
      }

      const data = await response.json();
      setCurrentTrack(data.item || null);
    } catch (error) {
      console.error("Error fetching track:", error);
    }
  };

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-4">
      <ToastContainer position="bottom-right" theme="dark" />

      {/* Login State UI */}
      {!token ? (
        <div className="flex flex-col items-center gap-4">
          <Toast message="Login to your spotify account" onClose={() => {}} />
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-read-currently-playing user-read-playback-state`}
            className="bg-[#DFFEE2] text-black hover:bg-transparent hover:text-white p-3 px-6 rounded-full border-2 border-[#DFFEE2] transition-all duration-300 font-bold"
          >
            Connect Spotify
          </a>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          {!currentTrack ? (
            <>
              <Toast message="Session Active: Start playing a song on Spotify!" onClose={() => {}} />
              <button
                className="bg-[#DFFEE2] text-black hover:bg-transparent hover:text-white p-3 px-6 rounded-full border-2 border-[#DFFEE2] transition-all duration-300"
                onClick={getCurrentTrack}
              >
                Sync Current Track
              </button>
            </>
          ) : (
            <MusicPlayer track={currentTrack} />
          )}
        </div>
      )}
    </div>
  );
};

export default SpotifyPlaylist;