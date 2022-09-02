import axios from "axios";

const FetchMusic = async (type) => {
  const response = await axios.get(
    `https://api.stats.fm/api/v1/users/kevinthomas/top/${type}?range=weeks`
  );

  return response.data.items.slice(0, 24);
};

export { FetchMusic };
