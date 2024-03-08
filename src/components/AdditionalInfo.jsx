import styled from "@emotion/styled";
import { contextData } from "../Context";

const Div1 = styled("div")`
  padding: 2vh 0vw;
  margin: 2vh 2vw;
  border-block: 1px solid #35353444;
`;
const Div2 = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const Div3 = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 1.3rem;
  font-weight: 600;
  @media (max-width: 1200px) {
    font-size: 1rem;
  }
`;
const P1 = styled("p")`
  color: #003339;
`;
function AdditionalInfo() {
  const { current } = contextData();
  if (!current) return;
  const {
    precipitation,
    relative_humidity_2m,
    temperature_2m,
    wind_speed_10m,
  } = current.current;
  return (
    <Div1>
      <Div2>
        <Div3>
          <p>Temperature</p>
          <P1>{temperature_2m}°C</P1>
        </Div3>
        <Div3>
          <p>precipitation</p>
          <P1>{precipitation} mm</P1>
        </Div3>
        <Div3>
          <p>Humidity</p>
          <P1>{relative_humidity_2m} %</P1>
        </Div3>
        <Div3>
          <p>Wind</p>
          <P1>{wind_speed_10m} Km/h</P1>
        </Div3>
      </Div2>
    </Div1>
  );
}

export default AdditionalInfo;
