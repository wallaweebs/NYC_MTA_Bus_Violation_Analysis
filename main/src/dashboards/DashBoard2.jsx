import DashBoard from "../components/DashBoard/DashBoard.jsx";
import Chart from "../components/Chart/Chart.jsx";
import { useState, useEffect } from "react";
import Papa from "papaparse";

export default function DashBoard2() {

  const [data, setData] = useState([]);

  console.log("Dashboard2 render start");
  useEffect(() => {
    console.log("USEEFFECT RAN!");
  }, []);

  useEffect(() => {
    console.log("logging");
    fetch(process.env.PUBLIC_URL + "/charts/nyc_monthly_violations_per_area_summed.csv")
      .then((response) => response.text())
      .then((csv) => {
        console.log("CSV FETCHED TEXT:", csv.slice(0, 200));
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
              console.log("RAW PARSED DATA:", results.data);
              const cleaned = results.data.filter(row =>
                Object.keys(row).some((key) => row[key])
              );
              console.log("CLEANED DATA:", cleaned);
              setData(cleaned);
            }
        });
      });
  }, []);

  // Format month date string to readable name
  const formatMonth = (monthStr) => {
    const [year, month] = monthStr.split("-");
    const date = new Date(year, month, 1);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  // Transform data: pivot so each row is a month, columns are boroughs
  const pivotByMonth = (data) => {
    const monthMap = {};

    data.forEach((row) => {
      const { borough, Month, violations } = row;
      if (borough && Month) {
        const formattedMonth = formatMonth(Month);
        if (!monthMap[formattedMonth]) {
          monthMap[formattedMonth] = { Month: formattedMonth, sortKey: Month };
        }
        monthMap[formattedMonth][borough] = violations;
      }
    });

    return Object.values(monthMap).sort((a, b) =>
      a.sortKey.localeCompare(b.sortKey)
    );
  };

  // Get all unique boroughs for line configuration
  const getBoroughLines = (data) => {
    const boroughs = new Set();
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1"];

    data.forEach((row) => {
      if (row.borough) boroughs.add(row.borough);
    });

    return Array.from(boroughs)
      .sort()
      .map((borough, idx) => ({
        dataKey: borough,
        stroke: colors[idx % colors.length],
      }));
  };

  const title = "How Have Violations Changed Month-to-Month?";

  // const pivoted = pivotByMonth(data);
  // console.log("PIVOTED DATA:", pivoted);


  const visualizations = [
    {
      subtitle: "Violations by Borough",
      text: "The Bronx had an overwhelming amount of around 3x more violations than the other boroughs whereas Queens had the least amount of violations for most months with a sharp increase in August.",
      chart:
          <Chart
            data={pivotByMonth(data)}
            xAxisKey="Month"
            lines={getBoroughLines(data)}
            leftYAxisLabel="Violations"
          />
    },
  ];

  try {
    return <DashBoard title={title} visualizations={visualizations} />;
  } catch (err) {
    console.error("RENDER ERROR IN DASHBOARD2:", err);
    return <div style={{ color: "red" }}>Render error — check console.</div>;
  }
}
