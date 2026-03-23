import { getPlaylist } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const playlistId = params.id;
    const data = await getPlaylist(playlistId);

    if (!data) {
      return NextResponse.json({ error: "Playlist not found" }, { status: 404 });
    }

    const { name, images, external_urls, tracks } = data;

    return NextResponse.json({
      name,
      images,
      external_urls,
      tracks: tracks.items.map((item: any) => ({
        id: item.track.id,
        name: item.track.name,
        artists: item.track.artists.map((artist: any) => artist.name).join(", "),
        albumImageUrl: item.track.album.images[0].url,
        songUrl: item.track.external_urls.spotify,
      })),
    });
  } catch (error) {
    console.error("Error in Spotify Playlist API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
