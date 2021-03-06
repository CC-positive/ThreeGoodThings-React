import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import moment from "moment";
import "moment/locale/ja";
import { blue } from "@material-ui/core/colors";
import { config } from "../config";
import useInterval from "use-interval";
import "../styles/Top.css";
import img from "../image/icon.png";

function Top(props) {
  const [imgData, setImgData] = useState(img);

  return (
    <div className="test">
      <h2 className="under">今日の良いことを投稿しよう</h2>
      <div className="test">
        <img className="topPage" src={imgData} />
      </div>
    </div>
  );
}

export default Top;
