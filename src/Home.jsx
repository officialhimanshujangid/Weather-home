import styled from "@emotion/styled";
import Header from "./components/Header2";
import { contextData } from "./Context";
import { useEffect, useState } from "react";
import { IoLocation } from "react-icons/io5";

function Home() {
  const { cross, location, current } = contextData();
  const [translateValue, setTranslateValue] = useState(cross);

  useEffect(() => {
    // Update translateValue when cross changes
    setTranslateValue(cross);
  }, [cross]);

  const Div = styled("div")`
    position: absolute;
    top: 0;
    left: 0;
    background: url("https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg");
    width: 100vw;
    height: 100vh;
    background-size: cover;
    transform: translateX(${translateValue === 0 ? 0 : 5000}px);
  `;
  const Div2 = styled("div")`
    color: aliceblue;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15vh;
    margin-inline: 2vw;

    @media (max-width: 1200px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 3vh;
      height: 80vh;
      gap: 10vh;
    }
  `;
  const H1 = styled("div")`
    font-size: 5rem;
    @media (max-width: 1200px) {
      font-size: 3rem;
    }
  `;
  const H2 = styled("div")`
    font-size: 10rem;
    @media (max-width: 1200px) {
      font-size: 7rem;
    }
  `;
  if (!current) return;
  return (
    <Div className={translateValue === 0 ? "home active" : "home"}>
      <Header />
      <Div2>
        <H1>
          <span>
            <IoLocation />
          </span>
          <span>
            {location.city}, {location.country}
          </span>
        </H1>
        <H2>{current.current.temperature_2m}°C</H2>
      </Div2>
    </Div>
  );
}

export default Home;
