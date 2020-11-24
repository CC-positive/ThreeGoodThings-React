import "../styles/App.css";
import Navbar from "./Navbar";
import TGTInput from "./TGTInput";
import TGTList from "./TGTList";
import React from "react";
import { useEffect, useState } from "react";

function App() {
  const [toukouState, setToukouState] = useState(0);

  function updatestate() {
    setToukouState(toukouState + 1);
  }

  return (
    <div className="App">
      <Navbar />
      <TGTInput updatestate={updatestate} />
      <TGTList toukouState={toukouState} />
    </div>
  );
}

export default App;
