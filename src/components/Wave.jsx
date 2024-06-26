/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import styled from "@emotion/styled";
import {
  Area,
  AreaChart,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { contextData } from "../Context";

const Div = styled("div")`
  position: absolute;
  bottom: 0;
  left: 0px;
  width: 100%;
`;

const Div1 = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const H2 = styled("div")`
  padding: 0vh 1vw;
  font-size: 1.5rem;
`;
function Wave() {
  const { history, location } = contextData();
  if (!history || history.error === true) return;
  const tempArray = history.daily.temperature_2m_max;
  const time = history.daily.time;

  const temperatureData = [
    {
      name: time[time.length - 1],
      temperature: tempArray[tempArray.length - 1],
    },
    {
      name: time[time.length - 2],
      temperature: tempArray[tempArray.length - 2],
    },
    {
      name: time[time.length - 3],
      temperature: tempArray[tempArray.length - 3],
    },
    {
      name: time[time.length - 4],
      temperature: tempArray[tempArray.length - 4],
    },
    {
      name: time[time.length - 5],
      temperature: tempArray[tempArray.length - 5],
    },
    {
      name: time[time.length - 6],
      temperature: tempArray[tempArray.length - 6],
    },
    {
      name: time[time.length - 7],
      temperature: tempArray[tempArray.length - 7],
    },
    {
      name: time[time.length - 8],
      temperature: tempArray[tempArray.length - 8],
    },
    {
      name: time[time.length - 9],
      temperature: tempArray[tempArray.length - 9],
    },
    {
      name: time[time.length - 10],
      temperature: tempArray[tempArray.length - 10],
    },
    {
      name: time[time.length - 11],
      temperature: tempArray[tempArray.length - 11],
    },
    {
      name: time[time.length - 12],
      temperature: tempArray[tempArray.length - 12],
    },
    {
      name: time[time.length - 13],
      temperature: tempArray[tempArray.length - 13],
    },
    {
      name: time[time.length - 14],
      temperature: tempArray[tempArray.length - 14],
    },
    {
      name: time[time.length - 15],
      temperature: tempArray[tempArray.length - 15],
    },
  ];
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{ backgroundColor: "#003339", color: "white", padding: 10 }}
        >
          <p>{`${label} : ${payload[0].value}°C`}</p>
        </div>
      );
    }
    return null;
  };
  const CustomizedLabel = ({ x, y, stroke, value }) => (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}°C
    </text>
  );
  const widths = window.screen.width;
  const heights =
    widths > 1200 ? window.innerHeight / 6 : window.innerHeight / 4;

  return (
    <Div1>
      <H2>Temprature History @{location.city}</H2>
      <Div>
        <ResponsiveContainer width="100%" height={heights}>
          <AreaChart
            data={temperatureData}
            margin={{ top: 10 }}
            padding={{ top: 10 }}
          >
            <Area
              dataKey="temperature"
              type="monotone"
              stroke="#FFA135"
              fill="#f78a0f"
              strokeWidth={1}
              name="Temperature"
              unit="°C"
              label={<CustomizedLabel />}
              height={heights}
            />

            <XAxis
              tickLine={false}
              stroke="#003339"
              fill="#003339"
              dataKey="name"
              height={0}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#003339", color: "white" }}
              content={<CustomTooltip />}
            />
            <Label content={<CustomizedLabel />} position="bottom" />
          </AreaChart>
        </ResponsiveContainer>
      </Div>
    </Div1>
  );
}

export default Wave;
