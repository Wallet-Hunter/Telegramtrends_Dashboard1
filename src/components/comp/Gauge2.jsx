import { csv } from "d3";
import Papa from "papaparse";
import ReactSpeedometer from "react-d3-speedometer";
import React, { useState, useEffect } from "react";

const GaugeGrpSent = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedRow, setSelectedRow] = useState("");
  const [numericValue, setNumericValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  useEffect(() => {
    fetch("/Group_Sentiment.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          complete: (result) => {
            setCsvData(result.data);
          },
          header: false, // If your CSV has headers
        });
      });
    let numericValue = "";
    numericValue = 50;
    setNumericValue(numericValue);
    //console.log(csvData);
  }, []);

  const handleRowChange = (event) => {
    const rowIndex = parseInt(event.target.value, 10);
    const rowData = csvData[rowIndex];
    if (rowData) {
      const thirdColumnKey = Object.keys(rowData)[3];
      const thirdColumnValue = rowData[thirdColumnKey];

      const ColumnKey = Object.keys(rowData)[1];
      const ColumnValue = rowData[ColumnKey];
      setDateValue(ColumnValue);

      setSelectedRow(
        Object.entries(rowData)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n")
      );

      let numericValue = "";
      numericValue = 50;
      if (thirdColumnValue === "neutral") {
        numericValue = 50;
      } else if (thirdColumnValue === "positive") {
        numericValue = (66 + 100) / 2;
      } else if (thirdColumnValue === "negative") {
        numericValue = (33 + 0) / 2;
      }

      setNumericValue(numericValue);
    }
  };

  return (
    <div>
      {csvData.length > 0 && (
        <div>
          <select onChange={handleRowChange}>
            {csvData.map((_, index) => (
              <option key={index} value={index}>
                {csvData[index][0]}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* <textarea value={selectedRow} readOnly rows={10} column={50}/>
        <textarea value={numericValue} readOnly rows={10} column={50}/> */}
      <ReactSpeedometer
        maxValue={100}
        value={numericValue}
        needleColor="black"
        startColor="red"
        currentValueText="Group Sentiment"
        segments={3}
        endColor="green"
        customSegmentLabels={[
          {
            //text:'NEGATIVE',
            position: "INSIDE",
            fontSize: "9px",
            color: "white",
          },
          {
            //text:'NEUTRAL',
            position: "INSIDE",
            fontSize: "9px",
            color: "white",
          },
          {
            //text:'POSITIVE',
            position: "INSIDE",
            fontSize: "9px",
            color: "white",
          },
        ]}
        textColor="white"
        ringWidth={30}
      />
    </div>
  );
};

export default GaugeGrpSent;
