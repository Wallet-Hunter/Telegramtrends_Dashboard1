import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import Papa from "papaparse";

const PieChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch and parse the CSV file
        const response = await fetch("/Overall_Daywise_Sentiment.csv"); // Update the path accordingly
        const reader = response.body.getReader();
        const result = await reader.read(); // Raw binary data
        const decoder = new TextDecoder("utf-8");
        const csv = decoder.decode(result.value);
        const results = Papa.parse(csv, { header: true });
        const data = results.data;
        console.log(data);

        // Group data by 'Sentiment'
        const sentimentCount = data.reduce((acc, item) => {
          const sentiment = item.Sentiment; // Assuming 'Sentiment' is the column name
          if (sentiment) {
            acc[sentiment] = (acc[sentiment] || 0) + 1;
          }
          return acc;
        }, {});

        // Extract labels and values from the sentiment count
        const labels = Object.keys(sentimentCount);
        const values = Object.values(sentimentCount);

        // Set the data for the Pie chart
        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Sentiments",
              data: values,
              backgroundColor: [
                "#FF6347", // Tomato (Red-Orange)
                "#FF4500", // OrangeRed
                "#FF7F50", // Coral
                "#FF8C00", // DarkOrange
              ],
              hoverOffset: 4,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching or parsing CSV data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: "500px", height: "500px", margin: "0 auto" }}>
      <h2>Pie Chart from CSV Data</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
