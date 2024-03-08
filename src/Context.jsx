/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useRef, useState } from "react";
const weatherContext = createContext();

function ContextDataProvider({ children }) {
  const date = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const [location, setLocation] = useState({
    city: "New Delhi",
    country: "India",
  });
  const positionsRef = useRef({ lat: 40.73061, lng: -73.935242 });

  const setPositionSync = (lat, lng) => {
    positionsRef.current = { lat, lng };
  };
  const [current, SetCurrent] = useState(null);
  const [forcast, SetForcast] = useState(null);
  const [history, SetHistory] = useState(``);
  // const [countryImage, SetcountryImage] = useState(null);
  const [cross, setCross] = useState(5000);
  const [loading, setloading] = useState(false);
  function settingCross(val) {
    setCross(val);
  }
  function getDates() {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    today.setDate(today.getDate() - 2);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    // Format the dates to "YYYY-MM-DD"
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const formattedToday = formatDate(today);
    const formattedThirtyDaysAgo = formatDate(thirtyDaysAgo);

    return {
      today: formattedToday,
      thirtyDaysAgo: formattedThirtyDaysAgo,
    };
  }

  // Example usage

  async function fetchWeather(location) {
    try {
      setloading(true);
      const { today, thirtyDaysAgo } = getDates();

      //   1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
      );
      const geoData = await geoRes.json();
      if (!geoData.results) throw new Error("Location not found");
      const { latitude, longitude, timezone, name, country, country_code } =
        geoData.results[0];
      setLocation({
        city: name,
        country: country,
      });
      // const imgResponse = await fetch(
      //   `https://api.unsplash.com/photos/random?query=dark-buildings&client_id=cDFL7NqmKVLVMc-ruSh0_UTFUpSk9Ul-97i2b_WD2t8`
      // );
      // const imgData = await imgResponse.json();
      // console.log(imgData.links.download);
      // SetcountryImage(imgData.links.download);
      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,cloud_cover,wind_speed_10m`
      );
      const weatherData = await weatherRes.json();
      SetCurrent(weatherData);
      const forcastRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code&forecast_days=1&forecast_hours=6`
      );
      const forcastData = await forcastRes.json();
      SetForcast(forcastData);

      const historyRes = await fetch(
        `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${thirtyDaysAgo}&end_date=${today}&daily=temperature_2m_max`
      );
      const historyData = await historyRes.json();
      SetHistory(historyData);
      setloading(false);
    } catch (err) {
      console.error(err);
    }
  }
  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setPositionSync(latitude, longitude);
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await response.json();
          const cityName = data.city;
          fetchWeather(cityName);
        } catch (error) {
          console.error("Error fetching city name:", error);
        }
      });
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }

  return (
    <weatherContext.Provider
      value={{
        location,
        date,
        getCurrentLocation,
        fetchWeather,
        current,
        forcast,
        history,
        cross,
        settingCross,
        loading,
      }}
    >
      {children}
    </weatherContext.Provider>
  );
}

function contextData() {
  const context = useContext(weatherContext);
  if (context === undefined) throw new Error("aborted");
  return context;
}

export { ContextDataProvider, contextData };
