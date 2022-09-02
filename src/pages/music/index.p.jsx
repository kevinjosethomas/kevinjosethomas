import Head from "next/head";

import { FetchMusic } from "lib/routes";
import Default from "ui/layouts/Default";
import Section from "./components/Section";

export default function Music(props) {
  return (
    <Default>
      <Head>
        <title>Music • Kevin Thomas</title>
        <meta name="title" content="Music • Kevin Thomas" />
        <meta property="og:title" content="Music • Kevin Thomas" />
        <meta property="twitter:title" content="Music • Kevin Thomas" />
      </Head>
      <div className="flex w-full flex-col items-start justify-start space-y-4">
        <div className="flex w-full flex-col items-start justify-start space-y-1">
          <div className="flex items-center space-x-2 text-4xl font-bold tracking-[-0.02rem] text-white text-opacity-80">
            <img src="/icons/music.svg" className="h-[40px] select-none" draggable="false" />
            <p>Music</p>
          </div>
          <p className="text-lg leading-tight text-white text-opacity-60">
            Automated Spotify stats of my top tracks, albums and artists over the last 4 weeks
            {" <3"}
          </p>
        </div>
        <div className="flex w-full flex-col items-start justify-start space-y-4">
          <Section i={1} type="track" music={props.tracks} />
          <Section i={2} type="album" music={props.albums} />
          <Section i={3} type="artist" music={props.artists} />
        </div>
        <a
          target="_blank"
          href="https://stats.fm/kevinthomas"
          className="mx-2 flex transform items-center gap-2 self-end rounded-full bg-white py-1  px-4 duration-300 hover:scale-105"
        >
          <i className="fab fa-spotify text-[#1DB954]" />
          <p className="font-medium">
            Powered by <span className="font-bold">stats.fm</span>
          </p>
        </a>
      </div>
    </Default>
  );
}

export async function getServerSideProps(ctx) {
  const responses = await Promise.all([
    FetchMusic("tracks"),
    FetchMusic("albums"),
    FetchMusic("artists"),
  ]);

  return {
    props: {
      tracks: responses[0],
      albums: responses[1],
      artists: responses[2],
    },
  };
}
