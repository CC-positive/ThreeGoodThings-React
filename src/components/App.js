import "../styles/App.css";
import Navbar from "./Navbar";
import TGTInput from "./TGTInput";
import TGTList from "./TGTList";
import React from "react";
import { useEffect, useState } from "react";

function App() {
  const [updateFlag, setUpdateFlag] = useState("OFF");

  function updateFlagChange() {
    console.log("qqqqqq");
    const updateFlag = "ON";
    setUpdateFlag(updateFlag);
  }
  console.log("レンダリング");
  return (
    <div className="App">
      <Navbar />
      <TGTInput updateFlagChange={updateFlagChange} />
      <TGTList />
    </div>
  );
}

export default App;
