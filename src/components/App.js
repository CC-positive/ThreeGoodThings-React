import "../styles/App.css";
import Navbar from "./Navbar";
import TGTInput from "./TGTInput";
import TGTList from "./TGTList";
import React from "react";
import MyPage from "./MyPage";
import RecommendList from "./RecommendList";
import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { config } from "../config";
import { useCookies } from "react-cookie";
import image1 from "../image/image1.png";
import image2 from "../image/image2.png";
import image3 from "../image/image3.png";

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
  const [recommend, setRecommend] = useState(false);
  const [currentView, setCurrentView] = useState("home");

  const CLIENT_ID =
    "1046055868678-v0icks04vbpf8i26ur786o0h27vfff48.apps.googleusercontent.com";
  // const CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT_ID;

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

  const login = async (response) => {
    if (response.tokenId && response.profileObj) {
      setIdToken(response.tokenId);
      setGoogleId(response.profileObj.googleId);
      setUserName(response.profileObj.name);
      setImgUrl(response.profileObj.imageUrl);
      setLoginSuccess(true);
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
      reward(response.profileObj.googleId, response.tokenId);
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
        setCurrentView={setCurrentView}
      />
      <div className="menu-container">
        {currentView === "myPage" ? (
          <>
            <MyPage
              userName={userName}
              imgUrl={imgUrl}
              reward={reward}
              updatestate={updatestate}
              idToken={idToken}
              googleId={googleId}
              setCurrentView={setCurrentView}
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
          <div className="top-container">
            <div className="google-login">
              <GoogleLogin
                clientId={CLIENT_ID}
                buttonText="Login"
                onSuccess={login}
                onFailure={handleLoginFailure}
                cookiePolicy={"single_host_origin"}
                responseType="code,token"
              />
            </div>
            <div className="image-container">
              <div className="single-image-left-container single-image-container">
                <img src={image1} alt="pic" className="pic" />
              </div>
              <div className="single-image-center-container single-image-container">
                <div className="top-page-comments">
                  <p className="main-comment">Three Good Things.</p>
                  <p className="sub-comment">－ 小さな幸せを、3つだけ。－</p>
                </div>
                <div className="center-image-container">
                  <img src={image2} alt="pic" className="pic" />
                </div>
              </div>
              <div className="single-image-right-container single-image-container">
                <img src={image3} alt="pic" className="pic" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
