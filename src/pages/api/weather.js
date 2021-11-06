import axios from "axios";

export default async function weather(req, res) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${process.env.OPENWEATHER_LOCATION}&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    return [response.data, null];
  } catch (e) {
    return [null, e];
  }
}
