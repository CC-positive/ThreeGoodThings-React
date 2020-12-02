import "../styles/App.css";
import Navbar from "./Navbar";
import TGTInput from "./TGTInput";
import TGTList from "./TGTList";
import React from "react";
import MyPage from "./MyPage";
import Top from "./Top";
import RecommendList from "./RecommendList";
import { useEffect, useState } from "react";
import { config } from "../config";
import { useCookies } from "react-cookie";

function App({ classes }) {
  const [toukouState, setToukouState] = useState(0);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [idToken, setIdToken] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [userName, setUserName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [email, setEmail] = useState("");
  const [today, setToday] = useState(false);
  const [updateFlag, setUpdateFlag] = useState("OFF");
  const [continuous, setContinuous] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies([
    "idToken",
    "googleId",
    "userName",
    "imgUrl",
    "email",
  ]);
  const [recommend, setRecommend] = useState(false);
  const [currentView, setCurrentView] = useState("home");

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
    setEmail("");
    removeCookie("googleId");
    removeCookie("idToken");
    removeCookie("userName");
    removeCookie("imgUrl");
    removeCookie("email");
  }

  function updatestate() {
    setToukouState(toukouState + 1);
  }

  useEffect(() => {
    const checkLogin = async () => {
      const cookieGoogleId = cookies.googleId;
      const cookieIdToken = cookies.idToken;
      const cookieUserName = cookies.userName;
      const cookieImgUrl = cookies.imgUrl;
      const cookieEmail = cookies.email;
      const validatePath = "https://oauth2.googleapis.com/tokeninfo?id_token=";
      const path = validatePath + cookieIdToken;
      const authRes = await fetch(path);
      if (authRes.status === 200) {
        setGoogleId(cookieGoogleId);
        setIdToken(cookieIdToken);
        setUserName(cookieUserName);
        setImgUrl(cookieImgUrl);
        setEmail(cookieEmail);
        setLoginSuccess(true);
        reward(cookieGoogleId, cookieIdToken);
      }
    };
    checkLogin();
  });

  return (
    <div className="App">
      <Navbar
        loginSuccess={loginSuccess}
        setLoginSuccess={setLoginSuccess}
        setIdToken={setIdToken}
        setGoogleId={setGoogleId}
        updateGoogleState={updateGoogleState}
        googleId={googleId}
        setUserName={setUserName}
        setImgUrl={setImgUrl}
        setEmail={setEmail}
        setToday={setToday}
        continuous={continuous}
        setCurrentView={setCurrentView}
        setCookie={setCookie}
      />
      <div>
        {currentView === "myPage" ? (
          <>
            <MyPage
              userName={userName}
              imgUrl={imgUrl}
              reward={reward}
              updatestate={updatestate}
              idToken={idToken}
              googleId={googleId}
              continuous={continuous}
            />
          </>
        ) : (
          <div></div>
        )}
        {loginSuccess && !today && currentView === "home" ? (
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

        {loginSuccess && !recommend && today && currentView === "home" ? (
          <>
            <RecommendList
              userName={userName}
              imgUrl={imgUrl}
              reward={reward}
              updatestate={updatestate}
              idToken={idToken}
              googleId={googleId}
              setRecommend={setRecommend}
            />
          </>
        ) : (
          <div></div>
        )}

        {loginSuccess && recommend && currentView === "home" ? (
          <TGTList
            toukouState={toukouState}
            idToken={idToken}
            googleId={googleId}
          />
        ) : (
          <></>
        )}

        {!loginSuccess ? <Top /> : <></>}
      </div>
    </div>
  );
}

export default App;
