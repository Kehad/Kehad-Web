import { useEffect, useState } from "react";

const CLIENT_ID = "acfc9d182abf48f2843c9047db71dff3";
const CLIENT_SECRET = "166fe1965a4f480684b7ede47aed5a9e";
const REDIRECT_URI = "http://localhost:5173/home"; // Change this to your app's redirect URI
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const CURRENT_TRACK_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing"; 

const SpotifyPlaylist = () => {
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);

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

  const getPlaylists = async () => {
    if (!token) return;
    try {
      const response = await fetch(PLAYLIST_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPlaylists(data.items || []);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  const getCurrentTrack = async () => {
    if (!token) return;
    try {
      const response = await fetch(CURRENT_TRACK_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCurrentTrack(data.item || null);
    } catch (error) {
      console.error("Error fetching current track:", error);
    }
  };

  return (
    <div>
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=playlist-read-private user-read-currently-playing user-read-playback-state`}
        >
          Login to Spotify
        </a>
      ) : (
        <>
          <button onClick={getPlaylists}>Get Playlists</button>
          <button onClick={getCurrentTrack}>Get Current Track</button>
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>{playlist.name}</li>
            ))}
          </ul>
          {currentTrack && (
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
          )}
        </>
      )}
    </div>
  );
};

export default SpotifyPlaylist;

