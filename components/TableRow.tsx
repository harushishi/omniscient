import { v4 as uuidv4 } from "uuid";
import { millisecondsToMinutes } from "date-fns";
import React from "react";
import { PlaylistTrackObject, TrackObjectFull } from "spotify-api";

type Props = {
  track: TrackObjectFull;
};

export default function TableRow({ track }: Props) {
  const artist = track.artists.map(({ name }) => name).join(" - ");
  return (
    <>
      <th scope="row" className="flex items-center px-6 py-4  blackspace-nowrap">
        <img className="w-10 h-10 rounded" src={track.album.images[0]?.url} alt="-" />
        <div className="pl-3">{track.name}</div>
      </th>
      <td className="px-6 py-4">{artist}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">{track.album.name}</div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">{millisecondsToMinutes(track.duration_ms).toString()}</div>
      </td>
    </>
  );
}
