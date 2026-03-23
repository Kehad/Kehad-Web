import { getNowPlaying } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (!response || response.requiresLogin) {
      return NextResponse.json({ isPlaying: false, requiresLogin: response?.requiresLogin || false });
    }

    if (!response.item) {
      return NextResponse.json({ isPlaying: false });
    }

    const { item, is_playing: isPlaying } = response;
    const { name, artists, album } = item;
    
    return NextResponse.json({
      isPlaying,
      name,
      artists: artists.map((artist: any) => artist.name).join(", "),
      album: album.name,
      albumImageUrl: album.images[0].url,
      songUrl: item.external_urls.spotify,
    });
  } catch (error) {
    console.error("Error in Spotify API route:", error);
    return NextResponse.json({ isPlaying: false }, { status: 500 });
  }
}
