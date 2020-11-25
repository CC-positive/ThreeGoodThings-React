import "../styles/App.css";
import Navbar from "./Navbar";
import TGTInput from "./TGTInput";
import TGTList from "./TGTList";
import React from "react";
import { useEffect, useState } from "react";
import { GoogleLogin, useGoogleLogin } from "react-google-login";
import { config } from "../config";
import { useCookies } from "react-cookie";

function App() {
  const [toukouState, setToukouState] = useState(0);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [idToken, setIdToken] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [userName, setUserName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [today, setToday] = useState(false);
  const [updateFlag, setUpdateFlag] = useState("OFF");
  const [continuous, setContinuous] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies([
    "idToken",
    "googleId",
    "userName",
    "imgUrl",
  ]);

  const CLIENT_ID =
    "535477566115-nk6dj1hrk0gvsfrmhimmbqgts7f3puqt.apps.googleusercontent.com";

  const login = async (response) => {
    if (response.tokenId && response.profileObj) {
      setLoginSuccess(true);
      setIdToken(response.tokenId);
      setGoogleId(response.profileObj.googleId);
      setUserName(response.profileObj.name);
      setImgUrl(response.profileObj.imageUrl);
      //save cookie
      setCookie("googleId", response.profileObj.googleId);
      setCookie("idToken", response.tokenId);
      setCookie("userName", response.profileObj.name);
      setCookie("imgUrl", response.profileObj.imageUrl);
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
      await reward(response.profileObj.googleId, response.tokenId);
    }
  };
  const reward = async (xGoogleId, xAuthToken) => {
    const API_ENDPOINT = config.THREETER_API_ENDPOINT;
    const url = API_ENDPOINT + "v1/threetter/rewards";
    let res;
    let data;
    try {
      res = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-googleid": xGoogleId,
          "x-auth-token": xAuthToken,
        },
      });
      data = await res.json();
      setContinuous(data.continuation);
      if (data.today === 0) {
        setToday(false);
      } else if (data.today === 1) {
        setToday(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  function updateGoogleState() {
    setLoginSuccess(false);
    setIdToken("");
    setGoogleId("");
    setUserName("");
    setImgUrl("");
    removeCookie("googleId");
    removeCookie("idToken");
    removeCookie("userName");
    removeCookie("imgUrl");
  }

  const handleLoginFailure = (response) => {
    alert("Failed to log in");
  };

  const handleLogoutFailure = (response) => {
    alert("Failed to log out");
  };

  function updatestate() {
    setToukouState(toukouState + 1);
  }

  useEffect(() => {
    const checkLogin = async () => {
      const cookieGoogleId = cookies.googleId;
      const cookieIdToken = cookies.idToken;
      const cookieUserName = cookies.userName;
      const cookieImgUrl = cookies.imgUrl;
      const validatePath = "https://oauth2.googleapis.com/tokeninfo?id_token=";
      const path = validatePath + cookieIdToken;
      const authRes = await fetch(path);
      if (authRes.status === 200) {
        setGoogleId(cookieGoogleId);
        setIdToken(cookieIdToken);
        setUserName(cookieUserName);
        setImgUrl(cookieImgUrl);
        setLoginSuccess(true);
        reward(cookieGoogleId, cookieIdToken);
      }
    };
    checkLogin();
  }, []);

  return (
    <div className="App">
      <Navbar
        loginSuccess={loginSuccess}
        updateGoogleState={updateGoogleState}
        googleId={googleId}
        continuous={continuous}
      />
      <div>
        {loginSuccess && !today ? (
          <>
            <TGTInput
              userName={userName}
              imgUrl={imgUrl}
              reward={reward}
              updatestate={updatestate}
              idToken={idToken}
              googleId={googleId}
              setToday={setToday}
            />
          </>
        ) : (
          <div></div>
        )}

        {loginSuccess && idToken ? (
          <TGTList
            toukouState={toukouState}
            idToken={idToken}
            googleId={googleId}
          />
        ) : (
          <>
            <h3>今日の3つのいいことを投稿してみよう</h3>
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
