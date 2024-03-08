import styled from "@emotion/styled";
import { contextData } from "../Context";

const Div = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-block: 4vh;
`;
const Div2 = styled("div")`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2.5vw;
  background-color: #003339;
  padding: 2vh 2vw;
  border-radius: 20px;
  color: white;
  width: 80vw;
  @media (max-width: 1200px) {
    width: 85vw;
  }
`;
const Box = styled("div")`
  padding: 1vh 1vw;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.active {
    background: linear-gradient(to bottom, #3f5d61, #02515a);
  }
`;
const H1 = styled("h1")`
  font-size: 25px;
  @media (max-width: 1200px) {
    font-size: 15px;
  }
`;
const H2 = styled("h2")`
  font-size: 20px;
  @media (max-width: 1200px) {
    font-size: 15px;
  }
`;

function Forcast() {
  function getWeatherIcon(wmoCode) {
    const icons = new Map([
      [[0], "☀️"],
      [[1], "🌤"],
      [[2], "⛅️"],
      [[3], "☁️"],
      [[45, 48], "🌫"],
      [[51, 56, 61, 66, 80], "🌦"],
      [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
      [[71, 73, 75, 77, 85, 86], "🌨"],
      [[95], "🌩"],
      [[96, 99], "⛈"],
    ]);
    const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
    if (!arr) return "NOT FOUND";
    return icons.get(arr);
  }
  const { forcast } = contextData();
  if (!forcast) return;
  const temperature = forcast.hourly.temperature_2m;
  const time = forcast.hourly.time;
  const weatherCode = forcast.hourly.weather_code;

  return (
    <Div>
      <Div2>
        <Box className="active">
          <H2>{time[5].split("T")[1]}</H2>
          <H1>{getWeatherIcon(weatherCode[5])}</H1>
          <H2>{temperature[5]} °C</H2>
        </Box>
        <Box>
          <H2>{time[4].split("T")[1]}</H2>
          <H1>{getWeatherIcon(weatherCode[4])}</H1>
          <H2>{temperature[4]} °C</H2>
        </Box>
        <Box>
          <H2>{time[3].split("T")[1]}</H2>
          <H1>{getWeatherIcon(weatherCode[3])}</H1>
          <H2>{temperature[3]} °C</H2>
        </Box>
        <Box>
          <H2>{time[2].split("T")[1]}</H2>
          <H1>{getWeatherIcon(weatherCode[2])}</H1>
          <H2>{temperature[2]} °C</H2>
        </Box>
        <Box>
          <H2>{time[1].split("T")[1]}</H2>
          <H1>{getWeatherIcon(weatherCode[1])}</H1>
          <H2>{temperature[1]} °C</H2>
        </Box>
        <Box>
          <H2>{time[0].split("T")[1]}</H2>
          <H1>{getWeatherIcon(weatherCode[0])}</H1>
          <H2>{temperature[0]} °C</H2>
        </Box>
      </Div2>
    </Div>
  );
}

export default Forcast;
