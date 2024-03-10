import { motion } from "framer-motion";
import { Fragment, memo } from "react";
import { useLanyardWS } from "use-lanyard";

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
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex w-72 select-none items-center justify-start gap-3 overflow-hidden rounded-lg border border-white border-opacity-20 p-3 2xl:w-80"
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
              <span className="text-white text-opacity-100">
                {data.spotify.song}
              </span>
            </p>
            <div className="flex items-center gap-1 text-xs 2xl:text-sm">
              <p>
                on <span className="text-white text-opacity-100">Spotify</span>
              </p>
              <img
                src="/icons/spotify.svg"
                alt="Spotify"
                className="h-3 w-3 saturate-0"
              />
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
          className="flex w-72 select-none items-center justify-start gap-2 overflow-hidden rounded-lg border border-white border-opacity-20 p-3 2xl:w-80 2xl:gap-3"
        >
          <img
            src="/icons/spotify.svg"
            alt="Spotify"
            className="h-5 w-5 saturate-0"
          />
          <p className="2xl:text-lg 3xl:text-xl">currently not listening...</p>
        </motion.a>
      )}
    </Fragment>
  );
});

export default Presence;
