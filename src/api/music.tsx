import { cache } from "react";

import axios from "axios";

export const FetchData = cache(async (type: string) => {
  const response = await axios.get(
    `https://api.stats.fm/api/v1/users/kevinthomas/top/${type}?range=weeks`,
  );

  return response.data.items.slice(0, 24);
});

export const FetchMusic = cache(async () => {
  const responses = await Promise.all([
    FetchData("tracks"),
    FetchData("albums"),
    FetchData("artists"),
  ]);

  return {
    tracks: responses[0],
    albums: responses[1],
    artists: responses[2],
  };
});
