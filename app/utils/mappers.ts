import { millisecondsToMinutes } from "date-fns";
import { TGenericSong } from "../types";
import { PlaylistTrack, Track, Episode } from "spotify-types";

export function fromSpotifyToGenericTrack(tracks: PlaylistTrack[]): TGenericSong[] {
    const mappedTracks = tracks.map(({ track }) => track);
    const mappedSongs = mappedTracks.map((track) => {
      if (!track) {
        return null
      }

      if (!isTrack(track)){
        return null
      }
      const artist = track.artists.map(({name}) => name).join(" - ");

      return {artist, id: track.id, name: track.name, logoUrl: track.album.images[0].url,
              duration: millisecondsToMinutes(track.duration_ms).toString()}
    })
    
    console.log({mappedSongs});
    return mappedSongs.filter(Boolean) as TGenericSong[]
  }

  function isTrack(track: Track | Episode): track is Track {
    return (<Track>track).artists !== undefined;    
 }