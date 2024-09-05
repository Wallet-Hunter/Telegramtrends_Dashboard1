import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Papa from "papaparse";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ isDashboard = false }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [csvFile, setCsvFile] = useState("/daily.csv"); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(csvFile);
        const text = await response.text();

        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: (results) => {
            processData(results.data);
          },
        });
      } catch (error) {
        console.error("Error fetching or parsing CSV data", error);
      }
    };

    const processData = (csvData) => {
      const labels = csvData.map((row) => row.date);
      const values = csvData.map((row) => row.count);

      const data = {
        labels,
        datasets: [
          {
            label: "Count",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      setChartData(data);
    };

    fetchData();
  }, [csvFile]);

  const handleCsvChange = (file) => {
    setCsvFile(file);
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "30px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => handleCsvChange("/daily.csv")}
          style={{
            border: "none",
            padding: "8px",
            width: "80px",
            borderRadius: "10px",
            backgroundColor: "#6870fa",
            color: "#fff",
          }}
        >
          Daily
        </button>
        <button
          onClick={() => handleCsvChange("/weekly.csv")}
          style={{
            border: "none",
            padding: "8px",
            width: "80px",
            borderRadius: "10px",
            backgroundColor: "#6870fa",
            color: "#fff",
          }}
        >
          Weekly
        </button>
        <button
          onClick={() => handleCsvChange("/monthly.csv")}
          style={{
            border: "none",
            padding: "8px",
            width: "80px",
            borderRadius: "10px",
            backgroundColor: "#6870fa",
            color: "#fff",
          }}
        >
          Monthly
        </button>
        <button
          onClick={() => handleCsvChange("/yearly.csv")}
          style={{
            border: "none",
            padding: "8px",
            width: "80px",
            borderRadius: "10px",
            backgroundColor: "#6870fa",
            color: "#fff",
          }}
        >
          Yearly
        </button>
      </div>
      <div style={{ height: "500px" }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: !isDashboard,
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `Count: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Count",
                },
                beginAtZero: true,
                ticks: {
                  stepSize: 10,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;
