import { motion } from "framer-motion";
import { Fragment, memo } from "react";
import { useLanyardWS } from "use-lanyard";

import spotify from "assets/img/icon/spotify.svg";

const Presence = memo(function () {
  const data = useLanyardWS("418707912836382721");

  return (
    <Fragment>
      {data?.spotify ? (
        <motion.a
          target="_blank"
          href="https://open.spotify.com/user/ock5719fh26056w67awzv7rty"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex w-72 select-none items-center justify-start gap-3 overflow-hidden rounded-lg border-2 border-white border-opacity-5 bg-white bg-opacity-5 p-3 2xl:w-80 3xl:mt-6"
        >
          {data.spotify.album_art_url && (
            <img
              src={data?.spotify.album_art_url}
              alt="Album Art"
              className="w-10 rounded-md 2xl:w-12"
            />
          )}
          <div className="flex w-56 flex-col overflow-hidden whitespace-nowrap leading-snug text-white text-opacity-75 2xl:w-64">
            <p className="overflow-hidden text-ellipsis 2xl:text-lg 3xl:text-xl">
              Listening to{" "}
              <span className="font-semibold text-opacity-90">{data.spotify.song}</span>
            </p>
            <div className="flex items-center gap-1 text-xs 2xl:text-sm">
              <img src={spotify} alt="Spotify" className="h-3 2xl:h-4" />
              <p>
                on <span className="font-semibold text-opacity-90">Spotify</span>
              </p>
            </div>
          </div>
        </motion.a>
      ) : (
        <motion.a
          target="_blank"
          href="https://open.spotify.com/user/ock5719fh26056w67awzv7rty"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex w-72 select-none items-center justify-start gap-2 overflow-hidden rounded-lg border-2 border-white border-opacity-5 bg-white bg-opacity-5 p-3 2xl:w-80 2xl:gap-3 3xl:mt-6"
        >
          <img src={spotify} alt="Spotify" className="h-4 saturate-0 2xl:h-5" />
          <p className="2xl:text-lg 3xl:text-xl">currently not listening...</p>
        </motion.a>
      )}
    </Fragment>
  );
});

export default Presence;