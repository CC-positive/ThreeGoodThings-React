import { useState, useEffect } from "react";
import React from "react";
import TGT from "./TGT";
import testData from "../util/testTGTList.json";
import Grid from "@material-ui/core/Grid";
import { config } from "../config";

import "../styles/MyPage.css";

function MyPage(props) {
  //const [tgtList, setTGTList] = useState([]);

  const goHome = () => {
    props.setCurrentView("home");
  };

  useEffect(() => {}, []);

  return (
    <>
      <button className="home-button" onClick={goHome}>
        home
      </button>
    </>
  );
}

export default MyPage;
