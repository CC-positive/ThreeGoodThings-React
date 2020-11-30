import { useState } from "react";
import React from "react";
import { cyan } from "@material-ui/core/colors";
import img from "../image/threetter_logo.png";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import { GoogleLogin } from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { makeStyles } from "@material-ui/core/styles";
import { config } from "../config";

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
    "1046055868678-v0icks04vbpf8i26ur786o0h27vfff48.apps.googleusercontent.com";
  // const CLIENT_ID =
  //   "535477566115-nk6dj1hrk0gvsfrmhimmbqgts7f3puqt.apps.googleusercontent.com";

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
      props.setEmail(response.profileObj.email);
      props.setLoginSuccess(true);
      //save cookie
      props.setCookie("googleId", response.profileObj.googleId);
      props.setCookie("idToken", response.tokenId);
      props.setCookie("userName", response.profileObj.name);
      props.setCookie("imgUrl", response.profileObj.imageUrl);
      props.setCookie("email", response.profileObj.email);
      ////login api send
      //set header
      const API_ENDPOINT = config.THREETER_API_ENDPOINT;
      const url = API_ENDPOINT + "v1/threetter/login";
      //set body
      const obj = {};
      obj.googleId = response.profileObj.googleId;
      obj.userName = response.profileObj.name;
      obj.picture = response.profileObj.imageUrl;
      obj.email = response.profileObj.email;
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
        <>
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={login}
            onFailure={handleLoginFailure}
            cookiePolicy={"single_host_origin"}
            responseType="code,token"
          />
        </>
      )}
    </AppBar>
  );
}

export default Navbar;
