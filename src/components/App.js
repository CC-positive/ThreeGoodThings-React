import "../styles/App.css";
import Navbar from "./Navbar";
import TGTInput from "./TGTInput";
import TGTList from "./TGTList";
import React from "react";
import { useEffect, useState } from "react";
import {
  GoogleLogin,
  GoogleLogout,
  useGoogleLogin,
  useGoogleLogout,
} from "react-google-login";
import { config } from "../config";

function App() {
  const [toukouState, setToukouState] = useState(0);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [idToken, setIdToken] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [userName, setUserName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [updateFlag, setUpdateFlag] = useState("OFF");

  const CLIENT_ID =
    "535477566115-nk6dj1hrk0gvsfrmhimmbqgts7f3puqt.apps.googleusercontent.com";
  const login = async (response) => {
    console.log(response);
    if (response.tokenId && response.profileObj) {
      setLoginSuccess(true);
      setIdToken(response.idToken);
      setGoogleId(response.profileObj.googleId);
      setUserName(response.profileObj.name);
      setImgUrl(response.profileObj.imageUrl);

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
            "x-auth-token": response.idToken,
          },
          redirect: "follow", // manual, *follow, error
          body: JSON.stringify(obj), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
        });
      } catch {
        console.log("登録に失敗しました。");
      }
    }
  };

  const logout = (response) => {
    setLoginSuccess(false);
    setIdToken("");
    setGoogleId("");
    setUserName("");
    setImgUrl("");
  };

  const handleLoginFailure = (response) => {
    alert("Failed to log in");
  };

  const handleLogoutFailure = (response) => {
    alert("Failed to log out");
  };

  function updateFlagChange() {
    console.log("qqqqqq");
    const updateFlag = "ON";
    setUpdateFlag(updateFlag);
  }
  function updatestate() {
    setToukouState(toukouState + 1);
  }

  return (
    <div className="App">
      <Navbar />

      <div>
        {loginSuccess ? (
          <>
            <br />
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={logout}
              onFailure={handleLogoutFailure}
            ></GoogleLogout>
            <TGTInput
              userName={userName}
              imgUrl={imgUrl}
              updateFlagChange={updateFlagChange}
              updatestate={updatestate}
              idToken={idToken}
            />
            <TGTList toukouState={toukouState} idToken={idToken} />
          </>
        ) : (
          <>
            <br />
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
      </div>
    </div>
  );
}

export default App;
