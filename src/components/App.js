import "../styles/App.css";
import Navbar from "./Navbar";
import TGTInput from "./TGTInput";
import TGTList from "./TGTList";
import React from "react";

function App() {
  return (
    <div className="App">
      <Navbar />
      <TGTInput />
      <TGTList />
    </div>
  );
}

export default App;
