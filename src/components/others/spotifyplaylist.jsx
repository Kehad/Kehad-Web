import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MusicPlayer from "../home/MusicPlayer";
import Toast from "./toast";

const CLIENT_ID = import.meta.env.VITE_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_REACT_APP_SPOTIFY_CLIENT_SECRET;
// const REDIRECT_URI = "https://kehad.onrender.com"; // Change this to your app's redirect URI
const REDIRECT_URI = "https://kehad.onrender.com" || "http://localhost:5173/"; // Change this to your app's redirect URI
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const CURRENT_TRACK_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

const SpotifyPlaylist = () => {
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [showToast, setShowToast] = useState(false);

  console.log(
    "Client ID:",
   CLIENT_ID,
  );

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = localStorage.getItem("spotify_token");

    if (!storedToken && hash) {
      const params = new URLSearchParams(hash.substring(1));
      storedToken = params.get("access_token");
      localStorage.setItem("spotify_token", storedToken);
      window.location.hash = "";
    }

    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token && !currentTrack) {
      toast.info("You are logged in but no current track is playing on Spotify.");
    }
  }, [token, currentTrack]);

 

  const getCurrentTrack = async () => {
    if (!token) return;
    console.log("Fetching current track...");
    try {
      const response = await fetch(CURRENT_TRACK_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      const data = await response.json();
      setCurrentTrack(data.item || null);
    } catch (error) {
      console.error("Error fetching current track:", error);
    }
  };

  return (
    <div>
      {/* {token && <ToastContainer />} */}
       <ToastContainer />
      {!token && (
        <Toast
          message="Login to your spotify account"
          onClose={() => setShowToast(false)}
        />
      )}
      {token && !currentTrack && (
        <Toast
          message="You are logged in but no current track is playing on Spotify."
          onClose={() => setShowToast(false)}
        />
      )}
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=playlist-read-private user-read-currently-playing user-read-playback-state`}
          className="bg-[#DFFEE2] dark:text-black text-black hover:text-white p-3 rounded-full border-[#dffee2] border-2 hover:border-2 hover:border-[#dffee2] hover:bg-transparent"
        >
          Login to Spotify
        </a>
      ) : (
        <>
          {/* <button onClick={getPlaylists}>Get Playlists</button> */}
          {!currentTrack ? (
            <button
              className="bg-[#DFFEE2] dark:text-black text-black hover:text-white p-3 rounded-full border-[#dffee2] border-2 hover:border-2 hover:border-[#dffee2] hover:bg-transparent"
              onClick={getCurrentTrack}
            >
              Get Current Your Track
            </button>
          ) : (
            <>
              <ul>
                {playlists.map((playlist) => (
                  <li key={playlist.id}>{playlist.name}</li>
                ))}
              </ul>
              <MusicPlayer track={currentTrack} />
            </>
          )}
          {/* {currentTrack && (
            <div>
              <h3>Now Playing:</h3>
              <p>
                {currentTrack.name} -{" "}
                {currentTrack.artists.map((artist) => artist.name).join(", ")}
              </p>
              <img
                src={currentTrack.album.images[0].url}
                alt={currentTrack.name}
                width="100"
              />
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default SpotifyPlaylist;
