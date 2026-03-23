"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Track {
  name: string;
  artists: string;
  albumImageUrl: string;
  songUrl: string;
  isPlaying: boolean;
}

const MusicPlayer = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsLogin, setNeedsLogin] = useState(false);

  const fetchNowPlaying = async () => {
    try {
      const response = await fetch("/api/spotify/now-playing");
      const data = await response.json();
      
      if (data.requiresLogin) {
        setNeedsLogin(true);
        setTrack(null);
      } else if (data.isPlaying) {
        setNeedsLogin(false);
        setTrack(data);
      } else {
        setNeedsLogin(false);
        setTrack(null);
      }
    } catch (error) {
      console.error("Error fetching Spotify data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
    // Refresh every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-row p-4 bg-[#DFFEE2]/30 gap-4 w-64 rounded-xl animate-pulse backdrop-blur-sm">
        <div className="w-6 h-6 bg-[#DFFEE2] rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-[#DFFEE2] rounded w-3/4" />
          <div className="h-2 bg-[#DFFEE2] rounded w-1/2" />
        </div>
      </div>
    );
  }

  if (needsLogin) {
    return (
      <a 
        href="/api/spotify/login"
        className="flex flex-row p-4 bg-[#DFFEE2]/10 border border-[#DFFEE2]/30 hover:bg-[#DFFEE2]/30 transition-all duration-300 gap-4 w-max rounded-xl backdrop-blur-sm group cursor-pointer"
      >
        <div className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
           <SpotifyIcon color="#1DB954" />
        </div>
        <div className="flex flex-col pr-4 justify-center">
          <p className="text-sm font-semibold text-black dark:text-white">Login to Spotify</p>
          <p className="text-[10px] opacity-60">To see Now Playing</p>
        </div>
      </a>
    );
  }

  if (!track) {
    return (
      <div className="flex flex-row p-4 bg-[#DFFEE2]/10 border border-[#DFFEE2]/30 gap-4 w-max rounded-xl backdrop-blur-sm">
        <div className="opacity-50 transition-all duration-1000 animate-pulse">
           <SpotifyIcon color="#DFFEE2" />
        </div>
        <div className="flex flex-col pr-4">
          <p className="text-sm font-semibold text-black dark:text-white">Not Playing</p>
          <p className="text-[10px] opacity-60">Spotify</p>
        </div>
      </div>
    );
  }

  return (
    <a 
      href={track.songUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex flex-row p-4 bg-[#DFFEE2] hover:bg-[#c9f0bd] transition-all duration-300 gap-4 w-max rounded-xl shadow-lg group cursor-pointer"
    >
      <div className="group-hover:scale-110 transition-transform duration-300">
        <SpotifyIcon color="#1DB954" />
      </div>
      <div className="flex flex-col pr-4 max-w-[150px]">
        <p className="text-sm font-bold text-black truncate">{track.name}</p>
        <p className="text-[10px] text-black/70 truncate">
          {track.artists}
        </p>
      </div>
      <div className="relative w-10 h-10 flex-shrink-0">
        <img
          src={track.albumImageUrl}
          alt={track.name}
          className="rounded-lg object-cover w-full h-full shadow-md"
        />
        <div className="absolute -bottom-1 -right-1">
           <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        </div>
      </div>
    </a>
  );
};

const SpotifyIcon = ({ color }: { color: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.308c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm1.469-3.267c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm.126-3.403c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392z" />
  </svg>
);

export default MusicPlayer;
