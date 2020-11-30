import { useState } from "react";
import React from "react";
import img from "../image/threetter_logo.png";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { config } from "../config";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  icon: {
    marginLeft: "auto",
    marginRight: "auto",
    height: 60,
  },
  logout: {
    marginLeft: "auto",
  },
  navber: {
    backgroundColor: "white",
    background: "transparent",
    boxShadow: "none",
  },
}));

function Navbar(props) {
  const [imgData, setImgData] = useState(img);
  const classes = useStyles();
  const CLIENT_ID =
    "1046055868678-v0icks04vbpf8i26ur786o0h27vfff48.apps.googleusercontent.com";
  // const CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT_ID;

  const logout = () => {
    props.updateGoogleState();
    props.setCurrentView("home");
  };

  const handleLogoutFailure = () => {
    alert("Failed to log out");
  };

  const goMyPage = () => {
    props.setCurrentView("myPage");
  };

  const login = async (response) => {
    if (response.tokenId && response.profileObj) {
      props.setIdToken(response.tokenId);
      props.setGoogleId(response.profileObj.googleId);
      props.setUserName(response.profileObj.name);
      props.setImgUrl(response.profileObj.imageUrl);
      props.setLoginSuccess(true);
      //save cookie
      props.setCookie("googleId", response.profileObj.googleId);
      props.setCookie("idToken", response.tokenId);
      props.setCookie("userName", response.profileObj.name);
      props.setCookie("imgUrl", response.profileObj.imageUrl);
      ////login api send
      //set header
      const API_ENDPOINT = config.THREETER_API_ENDPOINT;
      const url = API_ENDPOINT + "v1/threetter/login";
      //set body
      const obj = {};
      obj.googleId = response.profileObj.googleId;
      obj.userName = response.profileObj.name;
      obj.picture = response.profileObj.imageUrl;
      try {
        const res = await fetch(url, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": response.tokenId,
            "x-googleid": response.profileObj.googleId,
          },
          redirect: "follow", // manual, *follow, error
          body: JSON.stringify(obj), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
        });
      } catch {
        console.log("登録に失敗しました。");
      }
      // reward(response.profileObj.googleId, response.tokenId);
    }
  };

  const handleLoginFailure = (response) => {
    alert("Failed to log in");
  };

  return (
    <AppBar position="sticky" className={classes.navber}>
      <Grid container>
        <Grid item xs={2} className={classes.image}>
          <img
            src={imgData}
            alt="ローディング中"
            title="threeter"
            className={classes.icon}
          ></img>
        </Grid>
        {props.loginSuccess ? (
          <Grid item xs={6}></Grid>
        ) : (
          <Grid item xs={8}></Grid>
        )}
        {props.loginSuccess ? (
          <Grid item className={classes.logout} xs={4}>
            <Grid container>
              <Grid item xs={6}>
                <Button
                  size="large"
                  className={classes.button}
                  startIcon={<PersonPinIcon />}
                  onClick={goMyPage}
                >
                  MYPAGE
                </Button>
              </Grid>
              <Grid item xs={6}>
                <GoogleLogout
                  clientId={CLIENT_ID}
                  render={(renderProps) => (
                    <Button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      // variant="contained"
                      variant="outlined"
                      // color="primary"
                      size="large"
                      className={classes.button}
                      startIcon={<ExitToAppIcon />}
                    >
                      LOGOUT
                    </Button>
                  )}
                  onLogoutSuccess={logout}
                  onFailure={handleLogoutFailure}
                ></GoogleLogout>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={2} className={classes.login}>
            <GoogleLogin
              clientId={CLIENT_ID}
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  // variant="contained"
                  variant="outlined"
                  // color="primary"
                  size="large"
                  className={classes.button}
                  startIcon={<PersonPinIcon />}
                >
                  LOGIN
                </Button>
              )}
              onSuccess={login}
              onFailure={handleLoginFailure}
              cookiePolicy={"single_host_origin"}
              responseType="code,token"
            />
          </Grid>
        )}
      </Grid>
    </AppBar>
  );
}

export default Navbar;
