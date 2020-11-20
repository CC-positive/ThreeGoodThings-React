import { useState, useEffect } from "react";
import React from "react";
import img1 from "../image/threetter.PNG";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";


function Navbar() {
  const [imgData, setImgData] = useState(img1);

    return (
        <AppBar position="static" className="Navbar">
            <Grid item xs={2}>
                <img src={imgData} alt="ローディング中" title="空と海" className="lottery"></img>
            </Grid>
        </AppBar>
    );
}

export default Navbar;
