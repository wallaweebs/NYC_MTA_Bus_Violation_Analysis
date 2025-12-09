import DashBoard from "../components/DashBoard/DashBoard.jsx";
import Chart from "../components/Chart/Chart.jsx";
import { useState, useEffect } from "react";
import Papa from "papaparse";

export default function DashBoard3() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("./charts/nyc_borough_violations.csv")
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

  const filterByBorough = (data, boroughName) => {
    return data.filter((row) => row.borough === boroughName);
  };

  const transformBoroughData = (data) => {
    const areaMap = {};
    let boroughAvg = 0;

    data.forEach((row) => {
      const { area, Quarter, violations, deviation_pct, borough_avg } = row;
      if (area && Quarter) {
        if (!areaMap[area]) {
          areaMap[area] = { area, borough_avg: parseFloat(borough_avg) || 0 };
        }

        areaMap[area][Quarter] = violations;
        areaMap[area][`${Quarter}_dev`] = parseFloat(deviation_pct) || 0;
        boroughAvg = parseFloat(borough_avg) || boroughAvg;
      }
    });

    const result = Object.values(areaMap);
    if (result.length > 0) {
      result.push({ area: "Borough Average" });
      data.forEach((row) => {
        const { Quarter, borough_avg } = row;
        if (Quarter && borough_avg) {
          result[result.length - 1][Quarter] = parseFloat(borough_avg);
        }
      });
    }

    return result;
  };

  const getQuarterLines = () => {
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#4682b4"];
    return [
      { dataKey: "2024Q4", stroke: colors[0] },
      { dataKey: "2025Q1", stroke: colors[1] },
      { dataKey: "2025Q2", stroke: colors[2] },
      { dataKey: "2025Q3", stroke: colors[3] },
      { dataKey: "2025Q4", stroke: colors[4] }
    ];
  };

  const transformBoroughAvgTrend = (data) => {
    const avgMap = {};

    data.forEach((row) => {
      const { Quarter, borough_avg } = row;
      if (Quarter && borough_avg && !avgMap[Quarter]) {
        avgMap[Quarter] = { Quarter, borough_avg: parseFloat(borough_avg) };
      }
    });

    return Object.values(avgMap).sort((a, b) => {
      const quarterOrder = ["2024Q4", "2025Q1", "2025Q2", "2025Q3", "2025Q4"];
      return quarterOrder.indexOf(a.Quarter) - quarterOrder.indexOf(b.Quarter);
    });
  };

  const boroughs = [
    "Queens",
    "Brooklyn",
    "Bronx",
    "Manhattan",
    "Staten Island",
  ];

  const title = "Which Neighborhoods Deviate From Their Borough Norm?";
  const visualizations = [];

  boroughs.forEach((borough) => {
    const boroughData = filterByBorough(data, borough);

    visualizations.push({
      subtitle: `${borough} - Neighborhoods`,
      text: `Violations by neighborhood across quarters.`,
      chart:
          <Chart
            data={transformBoroughData(boroughData)}
            xAxisKey="area"
            lines={getQuarterLines()}
            leftYAxisLabel="Violations"
          />
    });

    // Add borough average trend chart
    visualizations.push({
      subtitle: `${borough} - Borough Average Trend`,
      text: `How the borough average changed across quarters.`,
      chart:
          <Chart
            data={transformBoroughAvgTrend(boroughData)}
            xAxisKey="Quarter"
            lines={[{ dataKey: "borough_avg", stroke: "#FF0000" }]}
            leftYAxisLabel="Average Violations"
          />
    });
  });

  return <DashBoard title={title} visualizations={visualizations} />;
}
