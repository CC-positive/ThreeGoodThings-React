import { useState, useEffect } from "react";
import React from "react";
import img1 from "../image/threetter.PNG";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import { config } from "../config";
import {
    GoogleLogin,
    GoogleLogout,
    useGoogleLogin,
    useGoogleLogout,
  } from "react-google-login";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    icon: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    logout: {
        marginTop: -45,
        marginLeft: "auto",
    },
  }));


function Navbar(props) {
  const [imgData, setImgData] = useState(img1);
  const classes = useStyles();
  const CLIENT_ID =
    "535477566115-nk6dj1hrk0gvsfrmhimmbqgts7f3puqt.apps.googleusercontent.com";

//   useEffect(() => {
//     const loadTGTList = async () => {
//       const API_ENDPOINT = config.THREETER_API_ENDPOINT;
//       const url = API_ENDPOINT + "v1/threetter/rewards";
//       const headers = {};
//       const header = JSON.stringify(headers);
//       const method = "GET";
//       let res;
//       let data;
//       try {
//         res = await fetch(url, {
//           method: "GET", // *GET, POST, PUT, DELETE, etc.
//           mode: "cors", // no-cors, *cors, same-origin
//           headers: {
//             "googleId": props.googleId,
//           },
//         });
//         data = await res.json();
//         console.log(data);
//       } catch (e) {
//         console.log(e);
//         console.log("失敗")
//       }
//     };
//     loadTGTList();
//   }, [props.toukouState]);

  const logout = (response) => {
    props.updateGoogleState();
  };

  const handleLogoutFailure = (response) => {
    alert("Failed to log out");
  };

    return (
        <AppBar position="static" className="Navbar">
            <Grid item xs={12}>
                <img src={imgData} alt="ローディング中" title="空と海" className="lottery"></img>
            </Grid>
            {props.loginSuccess ? (
                <Grid item  className={classes.logout}>
                <GoogleLogout
                  clientId={CLIENT_ID}
                  buttonText="Logout"
                  onLogoutSuccess={logout}
                  onFailure={handleLogoutFailure}
                ></GoogleLogout>
                </Grid>
            ):(<></>)}
        </AppBar>
        );
}

export default Navbar;
