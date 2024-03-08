/* eslint-disable no-unused-vars */
import styled from "@emotion/styled";

import { contextData } from "../Context";
const Div1 = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-inline: 3vw;
  & > div > p {
    font-size: 1.3rem;
  }
`;

const Img = styled("img")`
  width: 230px;
  border-radius: 10px;

  height: 140px;
  @media (max-width: 1200px) {
    width: 200px;
  }
`;
const H1 = styled("div")`
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: flex-start;
  color: #003339;
  @media (max-width: 1200px) {
    font-size: 1.3rem;
    flex-direction: column;
  }
`;
// const H4 = styled("div")`
//   font-size: 5rem;
//   font-weight: 700;
//   display: flex;
//   align-items: flex-start;
//   color: #003339;
//   @media (max-width: 1200px) {
//     font-size: 3.5rem;
//     flex-direction: column;
//   }
// `;
const Div2 = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1em;
  font-size: 1.5rem;
`;
const Div3 = styled("div")`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.3rem;
  color: #003339;
`;
function LocationData() {
  const { location, date, current, countryImage } = contextData();
  if (!current) return;

  const { weather_code, cloud_cover, temperature_2m } = current.current;

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
  function cloudd(percent) {
    if (percent <= 25) return "Clear Sky";
    if (percent > 25 && percent < 50) return "Little Cloudy";
    if (percent >= 50 && percent < 75) return "Cloudy";
    if (percent >= 75) return "Rainy";
  }

  return (
    <Div1>
      <Div2>
        <H1>
          <span>{location.city} , </span>
          <span> {location.country}</span>
        </H1>
        <p>{date}</p>
        <Div3>
          <span>{getWeatherIcon(weather_code)}</span>
          <span>{cloudd(cloud_cover)}</span>
        </Div3>
      </Div2>
      {/* <H4>{temperature_2m} °C</H4> */}
      <Img src={countryImage} />
    </Div1>
  );
}

export default LocationData;
