import axios from "axios";

export default async function weather(req, res) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${process.env.OPENWEATHER_LOCATION}&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    console.log(response.data);

    return res.status(200).json({
      success: true,
      message: "OK - Successfully retrieved weather data",
      payload: response.data,
    });
  } catch (e) {
    return res.status(200).json({
      success: false,
      message: e,
    });
  }
}
