import { useState, useEffect } from "react";
import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@material-ui/core";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import { blue } from "@material-ui/core/colors";
import { config } from "../config";
import "../styles/MyTGTSingle.css";
import Test from "./Test";
import "../styles/LikedUser.css";
import {
  List,
  Avatar,
  Divider,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";

function LikedUser(props) {
  const back = () => {
    props.setCurrentLikeView("allLike");
    console.log(props.img);
  };

  return (
    <div className="likedBySingle" title="あなたにいいねしてくれた人">
      <A img={props.img} />
      <button onClick={back}>表示を消す</button>
    </div>
  );
}
export default LikedUser;

const A = (props) => {
  let A;
  A = props.img.map((i) => {
    return (
      <div className="likeList">
        <img className="avator" src={i.pic} />
        <p>{i.name}</p>
      </div>
    );
  });
  console.log(A);
  return <div>{A}</div>;
};
