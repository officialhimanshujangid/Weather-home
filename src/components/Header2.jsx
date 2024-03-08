import styled from "@emotion/styled";
import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { RiSearch2Line } from "react-icons/ri";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { contextData } from "../Context";
const Div = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2vh 4vw;
  background: transparent;
`;
const Button = styled("button")`
  border: 0;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  color: #003339;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled("form")`
  position: relative;
  background: white;
  height: 50px;
  border-radius: 40px;
  padding-inline: 5px;
  display: flex;
  align-items: center;
  &:hover .searchInput {
    width: 240px;
    padding-left: 10px;
    @media (max-width: 1200px) {
      width: 200px;
    }
  }

  &:hover > .searchButton {
    background: #003339;
    color: rgb(255, 255, 255);
  }
  & > .searchButton {
    color: #ffffff;
    float: right;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #003339;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s;
  }
`;
const Input = styled("input")`
  border: none;
  font-family: "Mulish", sans-serif;
  background: none;
  outline: none;
  float: left;
  padding-left: 0px;
  color: #000000;
  font-size: 16px;
  transition: 0.4s;
  line-height: 40px;
  width: 0px;
`;
function Header() {
  const [search, setSearch] = useState("");
  const { getCurrentLocation, fetchWeather, settingCross } = contextData();

  function handleSubmit(e) {
    e.preventDefault();
    if (!search) return;
    fetchWeather(search);
    setSearch("");
  }
  function currentLocation() {
    getCurrentLocation();
  }
  function handleCross() {
    settingCross(-2000);
  }
  return (
    <Div>
      <Button onClick={() => handleCross()}>
        <ImCancelCircle />
      </Button>
      <Button onClick={() => currentLocation()}>
        <FaLocationCrosshairs />
      </Button>
      <Form onSubmit={handleSubmit}>
        <Input
          className="searchInput"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          name=""
          placeholder="Search"
        />
        <Button className="searchButton">
          <RiSearch2Line />
        </Button>
      </Form>
    </Div>
  );
}

export default Header;
