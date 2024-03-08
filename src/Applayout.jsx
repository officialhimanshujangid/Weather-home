import styled from "@emotion/styled";
import Forcast from "./components/Forcast";
import Header from "./components/Header";
import LocationData from "./components/LocationData";
import Wave from "./components/Wave";
import AdditionalInfo from "./components/AdditionalInfo";
import { contextData } from "./Context";
import { useEffect, useState } from "react";
import Home from "./Home";
import Loader from "./components/Loader";

const Div = styled("div")`
  /* overflow: hidden; */
  position: relative;
  height: 100vh;
`;

function Applayout() {
  const { getCurrentLocation, loading } = contextData();
  const [locationFetched, setLocationFetched] = useState(false);
  console.log(loading);
  useEffect(() => {
    if (!locationFetched) {
      getCurrentLocation();
      setLocationFetched(true);
    }
  }, [locationFetched, getCurrentLocation]);
  return (
    <Div>
      <Header />
      <LocationData />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Forcast />
          <AdditionalInfo />
        </>
      )}
      <Wave />
      <Home />
    </Div>
  );
}

export default Applayout;
