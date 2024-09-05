import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import './App.css'
import GaugeDateSent from "./Gauge1";
// import GaugeGrpSent from "./Gauge2";

function Sentiment() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <GaugeDateSent />

    </div>
  );
}

export default Sentiment;
