import { useState, useEffect } from "react";
import React from "react";
import img1 from "../image/threetter.PNG";
import AppBar from "@material-ui/core/AppBar";

function Navbar() {
  const [imgData, setImgData] = useState(img1);

  return (
    <div className="Navbar">
      <img
        src={imgData}
        alt="ローディング中"
        title="空と海"
        className="lottery"
      ></img>
      <p>ここNavbarです</p>
    </div>
  );
}

export default Navbar;
