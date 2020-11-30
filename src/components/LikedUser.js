import { useState, useEffect } from "react";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../styles/LikedUser.css";

function LikedUser(props) {
  const back = () => {
    props.setCurrentLikeView("allLike");
    console.log(props.img);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className="likedBySingle" title="あなたにいいねしてくれた人">
      <A img={props.img} />
      <Button variant="contained" onClick={back}>
        表示を消す
      </Button>
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
