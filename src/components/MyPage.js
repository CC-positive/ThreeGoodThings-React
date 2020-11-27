import { useState, useEffect } from "react";
import React from "react";
import TGT from "./TGT";
import testData from "../util/testTGTList.json";
import Grid from "@material-ui/core/Grid";
import { config } from "../config";

import "../styles/MyPage.css";

function MyPage(props) {
  //const [tgtList, setTGTList] = useState([]);

  const goHome = () => {
    props.setCurrentView("home");
    console.log(props.imgUrl);
  };

  useEffect(() => {}, []);

  const likedByList = [];
  likedByList.push(
    <div>
      <img className="LikedByInfo" alt="googleUserImg" src={props.imgUrl} />
      <p className="likedByInfo">{props.userName}</p>
    </div>
  );

  return (
    <div>
      <img className="userPhoto" alt="googleUserImg" src={props.imgUrl} />
      <p className="userName">{props.userName}</p>
      <p className="myInfo">{props.continuous}日連続投稿中</p>

      <div className="likedBy" title="あなたにいいねしてくれた人">
        <p>{likedByList}</p>
      </div>
      <button className="home-button" onClick={goHome}>
        home
      </button>
    </div>
  );
}

export default MyPage;
