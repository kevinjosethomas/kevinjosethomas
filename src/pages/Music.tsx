import axios from "axios";
import { useEffect, useState } from "react";

import Image from "assets/img/banner/4.png";
import PageWrapper from "ui/wrappers/PageWrapper";
import Container from "ui/components/Music/Container";

const FetchMusic = async (type: string) => {
  const response = await axios.get(
    `https://api.stats.fm/api/v1/users/kevinthomas/top/${type}?range=weeks`
  );

  return response.data.items.slice(0, 24);
};

export default function Music() {
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    (async () => {
      const responses = await Promise.all([
        FetchMusic("tracks"),
        FetchMusic("albums"),
        FetchMusic("artists"),
      ]);

      setTracks(responses[0]);
      setAlbums(responses[1]);
      setArtists(responses[2]);
    })();
  }, []);

  return (
    <PageWrapper width="w-1/2" image={{ alt: "me!", src: Image }}>
      <Container i={1} type="track" data={tracks} />
      <Container i={2} type="album" data={albums} />
      <Container i={3} type="artist" data={artists} />
    </PageWrapper>
  );
}
