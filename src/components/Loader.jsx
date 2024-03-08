import styled from "@emotion/styled";
const Div = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
  margin-block: 3rem;
`;
const Span = styled("div")`
  &.loader {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: inline-block;
    border-top: 4px solid #fff;
    border-right: 4px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  &.loader::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border-left: 10px solid #0d484d;
    border-bottom: 4px solid transparent;
    animation: rotation 0.1s linear infinite reverse;
  }
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
function Loader() {
  return (
    <Div>
      <Span className="loader"></Span>
    </Div>
  );
}

export default Loader;
