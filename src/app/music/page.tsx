import { FetchMusic } from "@/api/music";

import Banner from "@/ui/components/Banner";
import Container from "./components/Container";

export default async function Music() {
  const { tracks, albums, artists } = await FetchMusic();

  return (
    <div className="flex w-full flex-row items-start justify-between">
      <div className="order-2 flex w-full flex-col gap-6 md:order-1 md:w-1/2">
        <Container order={1} type="track" data={tracks} />
        <Container order={2} type="album" data={albums} />
        <Container order={3} type="artist" data={artists} />
      </div>
      <Banner src="5" alt="Music" />
    </div>
  );
}
