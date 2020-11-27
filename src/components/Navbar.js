import { useState } from "react";
import React from "react";
import { cyan } from "@material-ui/core/colors";
import img from "../image/threetter_logo.png";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import { GoogleLogout } from "react-google-login";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  logout: {
    marginLeft: "auto",
  },
  navber: {
    backgroundColor: cyan[100],
  },
}));

function Navbar(props) {
  const [imgData, setImgData] = useState(img);
  const classes = useStyles();
  const CLIENT_ID =
    "535477566115-nk6dj1hrk0gvsfrmhimmbqgts7f3puqt.apps.googleusercontent.com";

  const logout = () => {
    props.updateGoogleState();
  };

  const handleLogoutFailure = () => {
    alert("Failed to log out");
  };

  const goMyPage = () => {
    props.setCurrentView("myPage");
  };

  return (
    <AppBar position="static" className={classes.navber}>
      <Grid item xs={12}>
        <img src={imgData} alt="ローディング中" title="threeter"></img>
      </Grid>
      {props.loginSuccess ? (
        <Grid item className={classes.logout}>
          <Grid>
            <font color="black">{props.continuous}日連続投稿中</font>
          </Grid>
          <button className="myPage-button" onClick={goMyPage}>
            MyPage
          </button>
          <GoogleLogout
            clientId={CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={logout}
            onFailure={handleLogoutFailure}
          ></GoogleLogout>
        </Grid>
      ) : (
        <></>
      )}
    </AppBar>
  );
}

export default Navbar;
