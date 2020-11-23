import "../styles/App.css";
import Navbar from "./Navbar";
import TGTInput from "./TGTInput";
import TGTList from "./TGTList";
import React from "react";
import { useState } from "react";
import {
  GoogleLogin,
  GoogleLogout,
  useGoogleLogin,
  useGoogleLogout,
} from "react-google-login";

function App() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [profileObj, setProfileObj] = useState("");

  const CLIENT_ID =
    "535477566115-nk6dj1hrk0gvsfrmhimmbqgts7f3puqt.apps.googleusercontent.com";
  const login = (response) => {
    if (response.accessToken) {
      console.log(response);
      setLoginSuccess(true);
      setAccessToken(response.accessToken);
      setGoogleId(response.googleId);
      setProfileObj(response.profileObj);
    }
  };
  const logout = (response) => {
    setLoginSuccess(false);
    setAccessToken("");
  };

  const handleLoginFailure = (response) => {
    alert("Failed to log in");
  };

  const handleLogoutFailure = (response) => {
    alert("Failed to log out");
  };

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
            {accessToken ? <h5>Your Access Token: {accessToken}</h5> : null}
            {googleId ? <h5>Your googleId: {googleId}</h5> : null}
            {profileObj ? <h5>Your name: {profileObj.name}</h5> : null}
            <TGTInput />
            <TGTList />
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
