import { useState, useEffect } from "react";
import React from "react";
import MyTGTList from "./MyTGTList";
import LikedUser from "./LikedUser";

import "../styles/MyPage.css";

function MyPage(props) {
  const [currentLikeView, setCurrentLikeView] = useState("allLike");
  const [name, setName] = useState([]);
  const [img, setImg] = useState([]);

  const goHome = () => {
    props.setCurrentView("home");
    console.log(props.imgUrl);
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="myArea">
        <img className="userPhoto" alt="googleUserImg" src={props.imgUrl} />
        <p className="userName">{props.userName}</p>
        <p className="myInfo">{props.continuous}日連続投稿中</p>
      </div>
      {currentLikeView === "singleLike" ? (
        <LikedUser
          name={name}
          img={img}
          setCurrentLikeView={setCurrentLikeView}
        />
      ) : (
        <></>
      )}

      <div className="likedBy" title="あなたの過去の投稿">
        <MyTGTList
          userName={props.userName}
          imgUrl={props.imgUrl}
          reward={props.reward}
          updatestate={props.updatestate}
          idToken={props.idToken}
          googleId={props.googleId}
          setRecommend={props.setRecommend}
          setCurrentLikeView={setCurrentLikeView}
          setName={setName}
          setImg={setImg}
        />
      </div>

      <button className="home-button" onClick={goHome}>
        home
      </button>
    </div>
  );
}

export default MyPage;
