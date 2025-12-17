import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function Chart({
  data,
  xAxisKey = "name",
  lines = [],
  colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c"],
  yAxisKey = [],
  leftYAxisLabel = "Left Axis",
  rightYAxisLabel = "Right Axis",
}) {
  // If no lines specified, automatically use all numeric columns except xAxisKey
  const lineConfig =
    lines.length > 0
      ? lines
      : data && data.length > 0
      ? Object.keys(data[0])
          .filter((key) => key !== xAxisKey && typeof data[0][key] === "number")
          .map((key, idx) => ({
            dataKey: key,
            stroke: colors[idx % colors.length],
          }))
      : [];

  return (
    <ResponsiveContainer width={800} height={600}>
      <LineChart
        data={data}
        margin={{ top: 50, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xAxisKey}
          stroke={"white"}
          angle={-45}
          textAnchor="end"
          height={90}
          interval={0}
          tick={{ fontSize: 12, fill: "white" }}
        />
        <YAxis
          yAxisId="left"
          stroke={"white"}
          tick={{ fill: "white" }}
          label={{
            value: leftYAxisLabel,
            angle: -90,
            position: "insideLeft",
            fill: "white",
          }}
        />
        {yAxisKey.length > 0 && (
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke={"white"}
            tick={{ fill: "white" }}
            label={{
              value: rightYAxisLabel,
              angle: 90,
              position: "insideRight",
              fill: "white",
            }}
          />
        )}

        <Tooltip />
        <Legend align="right" />

        {lineConfig.map((config, idx) => (
          <Line
            key={config.dataKey}
            type="monotone"
            dataKey={config.dataKey}
            stroke={config.stroke || colors[idx % colors.length]}
            dot={false}
            yAxisId={config.yAxisId || "left"}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
