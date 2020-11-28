import { useState, useEffect } from "react";
import React from "react";
import MyTGTList from "./MyTGTList";

import "../styles/MyPage.css";

function MyPage(props) {
  const goHome = () => {
    props.setCurrentView("home");
    console.log(props.imgUrl);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <img className="userPhoto" alt="googleUserImg" src={props.imgUrl} />
      <p className="userName">{props.userName}</p>
      <p className="myInfo">{props.continuous}日連続投稿中</p>

      <div className="likedBy" title="あなたにいいねしてくれた人">
        <MyTGTList
          userName={props.userName}
          imgUrl={props.imgUrl}
          reward={props.reward}
          updatestate={props.updatestate}
          idToken={props.idToken}
          googleId={props.googleId}
          setRecommend={props.setRecommend}
        />
      </div>

      <button className="home-button" onClick={goHome}>
        home
      </button>
    </div>
  );
}

export default MyPage;
