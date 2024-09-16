import { useState, useEffect } from "react";
import { BiWind } from "react-icons/bi";
import { FaSearchLocation } from "react-icons/fa";
import { HiSun } from "react-icons/hi";
import { LuWaves } from "react-icons/lu";
import { PiCloudSunFill } from "react-icons/pi";

// Built-in API request by city name -> (API) TO USE
const API = import.meta.env.VITE_APP_API_KEY;
const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [search, setSearch] = useState(false);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      setSearch(true);
    } catch (error) {
      console.log("Error fetching weather data.", error);
      setWeatherData(null);
      setSearch(true);
    }
  };

  useEffect(() => {
    if (city && search) {
      fetchWeatherData();
    }
  }, [city, search]);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 mt-10 p-2 w-[400px] h-[320px]">
      <div className="flex flex-row justify-between items-center bg-white rounded-2xl pl-2 pr-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-2xl outline-none p-2"
          placeholder="Enter City Name"
        />
        <button onClick={fetchWeatherData}>
          <FaSearchLocation className="" />
        </button>
      </div>

      {search && (
        <div>
          {weatherData ? (
            <div className="text-white">
              <div className="flex flex-col items-center text-5xl mt-5">
                {(weatherData?.main?.temp - 273.15)?.toFixed(2)}°C
              </div>
              <div className="flex flex-col items-center mt-4">
                {weatherData?.name}
              </div>

              <div className="flex flex-row justify-between mt-10 text-xl">
                <div className="flex flex-row items-center gap-x-3">
                  <BiWind />
                  <p>{(weatherData?.wind?.speed * 3.6)?.toFixed(2)} Kmph</p>
                </div>

                <div className="flex flex-row items-center gap-x-3">
                  <LuWaves />
                  <p>{weatherData?.wind?.humidity?.toFixed(2)} Kmph</p>
                </div>
              </div>

              <div className="flex flex-row justify-between mt-6 text-xl">
                <div className="flex flex-row items-center gap-x-3">
                  <HiSun />
                  <p>
                    {new Date(
                      weatherData?.sys?.sunrise * 1000
                    )?.toLocaleTimeString([], {
                      // hour: "numeric",
                      // minute: "numeric",

                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-x-3">
                  <PiCloudSunFill />
                  <p>
                    {new Date(
                      weatherData?.sys?.sunset * 1000
                    )?.toLocaleTimeString([], {
                      // hour: "numeric",
                      // minute: "numeric",

                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>Weather Data Not Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
