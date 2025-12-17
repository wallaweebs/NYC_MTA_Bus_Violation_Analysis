import DashBoard from "../components/DashBoard/DashBoard.jsx";
import Chart from "../components/Chart/Chart.jsx";
import { useState, useEffect } from "react";
import Papa from "papaparse";

export default function DashBoard3() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + "/charts/nyc_borough_violations.csv")
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
            )
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
      { dataKey: "2025Q4", stroke: colors[4] },
    ];
  };

  const boroughs = [
    "Queens",
    "Brooklyn",
    "Bronx",
    "Manhattan",
    "Staten Island",
  ];

  const title = "Which Neighborhoods Deviate From Their Borough Average?";
  const visualizations = [];

  const boroughTexts = {
    Queens: [
      "Overall, Q4 Oct-Dec had the lowest number of violations in all neighborhoods while Q2 Apr-Jun had the highest number of violations except in Astoria and Elmhurst. Jamaica Center had the highest number of violations while Maspeth had the lowest number compared to other neighborhoods.",
    ],
    Brooklyn: [
      "Similar to Queens, Q4 Oct-Dec had the lowest number of violations in all neighborhoods while Q1 Jan-Mar had the highest number of violations. Flatbush had the highest number of violations while all neighborhoods had around the same levels for other quarters except for Williamsburg.",
    ],
    Bronx: [
      "Just as the previous borough charts, Q4 Oct-Dec had the lowest number of violations while Q1 Jan-Mar and Q2 Apr-Jun had the highest number of violatiions per neighborhood. Overall, Pelham Parkway and Riverdale had the lowest number of violations while South Bronx had the highest compared to other neighborhoods.",
    ],
    Manhattan: [
      "Q4 Oct-Dec for both 2024 and 2025 had the lowest number of violations in all neighborhoods while Q2 Apr-Jun had the highest number of violations except in Midtown and Greenwich Village. Compared to all other neighborhoods, Greenwich Village had the lowest number of violations while the Upper East Side had the highest number of violations compared to all other neighborhoods.",
    ],
    "Staten Island": [
      "Q4 Oct-Dec had the lowest number of violations in all neighborhoods while Q1 Jan-Mar had the highest number. Overall Mid-Island had the lowest number of violations while St. George and Staten Island North Shore had around the same levels of highest violations compared to other neighborhoods.",
    ],
  };

  boroughs.forEach((borough) => {
    const boroughData = filterByBorough(data, borough);

    visualizations.push({
      subtitle: `${borough} - Neighborhoods`,
      text: boroughTexts[borough][0],
      chart: (
        <Chart
          data={transformBoroughData(boroughData)}
          xAxisKey="area"
          lines={getQuarterLines()}
          leftYAxisLabel="violations"
        />
      ),
    });
  });

  return <DashBoard title={title} visualizations={visualizations} />;
}
