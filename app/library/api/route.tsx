import { SimplifiedPlaylist } from "spotify-types";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const playlists: Array<Partial<SimplifiedPlaylist>> = Array.from({ length: 100 }, (v, i) => ({
    collaborative: faker.datatype.boolean(),
    description: faker.word.words(10),
    href: faker.internet.url(),
    id: faker.string.uuid(),
    name: faker.word.words(1),
    public: faker.datatype.boolean(),
  }));

  return new NextResponse(JSON.stringify(playlists));
}
