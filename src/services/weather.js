import axios from "axios";

const BASE_URL = "https://api.weatherapi.com/v1";
const apiKey = "852d38159a92402294f91636243004";

const constructUrlEndpoint = (endpoint, q, bonusParameters) =>
  `${BASE_URL}${endpoint}?key=${apiKey}&q=${q}${bonusParameters?.length ? "&" + bonusParameters.join("&") : ""}`;

export const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(constructUrlEndpoint("/current.json", city));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCurrentAstronomy = async (city) => {
  try {
    const response = await axios.get(constructUrlEndpoint("/astronomy.json", city));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCurrentForecast = async (city, daysNumber = 3) => {
  try {
    const response = await axios.get(constructUrlEndpoint("/forecast.json", city, ["days=" + daysNumber]));
    return response.data.forecast.forecastday;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAutoCompletionSearch = async (city) => {
  try {
    const response = await axios.get(constructUrlEndpoint("/search.json", city));
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
