// import logo from '../logo.svg';
import '../styles/App.css';
import Navbar from './Navbar';
import TGTInput from './TGTInput';
import TGTList from './TGTList';
//import { useState, useEffect } from "react";
import React from "react";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <h1>Hello World!!</h1>
      <Navbar />
      <TGTInput />
      <TGTList />
    </div>
  );
}

export default App;
