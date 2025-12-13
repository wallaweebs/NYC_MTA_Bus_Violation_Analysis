import DashBoard from "../components/DashBoard/DashBoard.jsx";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Scatter,
  ScatterChart,
} from "recharts";

export default function DashBoard4() {
  const [data, setData] = useState([]);

  console.log("Dashboard2 render start");
  useEffect(() => {
    console.log("USEEFFECT RAN!");
  }, []); // ?????

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/charts/nyc_violation_time_patterns.csv")
      .then((response) => response.text())
      .then((csv) => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: (results) =>
            setData(
              results.data.filter((row) =>
                Object.keys(row).some((key) => row[key])
              )
            ),
        });
      });
  }, []);

  const weekdayOrder = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const prepared = data.map((d) => ({
    hour: +d.hour,
    weekdayIndex: weekdayOrder.indexOf(d.weekday),
    weekday: d.weekday,
    value: +d["0"],
  }));

  const colorFor = (v) => {
    const max = 32000;
    const t = Math.min(1, v / max);
    const r = 255;
    const g = Math.round(162 * (1 - t));
    const b = 0;
    return `rgb(${r},${g},${b})`;
  };

  const title = "When During the Day Do Violations Occur?";
  const visualizations = [
    {
      subtitle: "Violation Heatmap by Hours of the Day for Each Day",
      text: "Violations have occurred the most between 9 AM - 4 PM from Monday - Friday which makes sense since this includes rush hour to go to work and school and weekdays tend to be busiest.",
      chart: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ScatterChart
            width={800}
            height={420}
            margin={{ top: 20, right: 20, bottom: 25, left: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="white" />
            <XAxis
              type="number"
              dataKey="hour"
              ticks={[0, 3, 6, 9, 12, 15, 18, 21]}
              name="Hour"
              stroke={"white"}
              label={{
                value: "Hour of Day",
                position: "insideBottom",
                offset: -20,
                fill: "#ffffffff",
              }}
            />
            <YAxis
              type="number"
              dataKey="weekdayIndex"
              ticks={[0, 1, 2, 3, 4, 5, 6]}
              tickFormatter={(i) => weekdayOrder[i]}
              name="Weekday"
              stroke={"white"}
              label={{
                value: "Day of Week",
                angle: -90,
                offset: -50,
                position: "insideLeft",
                fill: "#fffcfcff",
              }}
            />
            <Tooltip
              formatter={(v, _k, p) => [
                p.payload.value,
                `${p.payload.weekday} @ ${p.payload.hour}:00`,
              ]}
            />
            <Scatter
              data={prepared}
              shape={(props) => {
                const { cx, cy, value } = props;
                const size = 18; // cell size
                return (
                  <rect
                    x={cx - size / 2}
                    y={cy - size / 2}
                    width={size}
                    height={size}
                    fill={colorFor(value)}
                    rx={3}
                    ry={3}
                  />
                );
              }}
            />
          </ScatterChart>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingLeft: 8,
            }}
          >
            <span style={{ fontSize: 12, color: "#ccc" }}>Low</span>
            <div
              style={{
                flex: 1,
                height: 12,
                background:
                  "linear-gradient(90deg, rgba(255, 162, 0, 1) 0%, rgba(255, 0, 0, 1) 100%)",
                borderRadius: 6,
              }}
            />
            <span style={{ fontSize: 12, color: "#ccc" }}>High</span>
          </div>
        </div>
      ),
    },
  ];

  return <DashBoard title={title} visualizations={visualizations} />;
}
