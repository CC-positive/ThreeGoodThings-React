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
  const [continuous,setContinuous] = useState(0)

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
            "x-googleid": response.profileObj.googleId,
          },
          redirect: "follow", // manual, *follow, error
          body: JSON.stringify(obj), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
        });
      } catch {
        console.log("登録に失敗しました。");
      }
    }

      const API_ENDPOINT = config.THREETER_API_ENDPOINT;
      const url = API_ENDPOINT + "v1/threetter/rewards";
      const headers = {};
      const header = JSON.stringify(headers);
      const method = "GET";
      let res;
      let data;
      try {
        console.log(response.profileObj.googleId)
        res = await fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-googleid": response.profileObj.googleId,
            "x-auth-token": response.idToken,
          },
        });
        data = await res.json();
        setContinuous(data.continuation);
      } catch (e) {
        console.log(e);
        console.log("失敗")
      }
  };

  function updateGoogleState(){
    setLoginSuccess(false);
    setIdToken("");
    setGoogleId("");
    setUserName("");
    setImgUrl("");
  }

  const handleLoginFailure = (response) => {
    alert("Failed to log in");
  };

  const handleLogoutFailure = (response) => {
    alert("Failed to log out");
  };

  function updateFlagChange() {
    const updateFlag = "ON";
    setUpdateFlag(updateFlag);
  }
  function updatestate() {
    setToukouState(toukouState + 1);
  }

  return (
    <div className="App">
      <Navbar loginSuccess={loginSuccess} updateGoogleState={updateGoogleState} googleId={googleId} continuous={continuous}/>

      <div>
        {loginSuccess ? (
          <>
            <TGTInput
              userName={userName}
              imgUrl={imgUrl}
              updateFlagChange={updateFlagChange}
              updatestate={updatestate}
              idToken={idToken}
              googleId={googleId}
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
