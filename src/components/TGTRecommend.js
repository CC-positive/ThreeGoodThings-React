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
import useInterval from "use-interval";

function TGTRecommend(props) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [state, setState] = useState(0);

  useInterval(() => {
    setState(state + 1);
  }, 5000);

  useEffect(() => {
    const getRecommend = async () => {
      const API_ENDPOINT = config.THREETER_API_ENDPOINT;
      const tgtId = props.tgtId;
      console.log(tgtId);
      const url = API_ENDPOINT + "v1/threetter/likes?tgtId=" + tgtId;

      let res;
      let data;
      try {
        res = await fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": props.tokenId,
            "x-googleid": props.googleId,
          },
        });
        data = await res.json();
        setLiked(data.likedByMe);
        setLikeCount(data.likes);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    getRecommend();

    console.log(props.goodThingText);
  }, []);

  const tgtliked = async () => {
    const API_ENDPOINT = config.THREETER_API_ENDPOINT;
    const url = API_ENDPOINT + "v1/threetter/likes";
    const obj = {};
    obj.tgtId = props.tgtId;

    let res;
    let data;
    try {
      res = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": props.tokenId,
          "x-googleid": props.googleId,
        },
        body: JSON.stringify(obj), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
      });
      setLiked(true);
      setLikeCount(likeCount + 1);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <>
        <ListItem>
          <ListItemAvatar>
            {liked ? (
              <div>
                <ThumbUpAltRoundedIcon
                  style={{ color: blue[500], fontSize: 35 }}
                />
                <Typography
                  className="likeCap"
                  variant="caption"
                  display="inline"
                  style={
                    likeCount !== 0
                      ? { color: blue[500] }
                      : { ccolor: "#ffffff" }
                  }
                >
                  {likeCount}
                </Typography>
              </div>
            ) : (
              <div>
                <ThumbUpAltRoundedIcon
                  style={{ color: blue[100], fontSize: 35 }}
                  onClick={tgtliked}
                />
                <Typography
                  variant="caption"
                  display="inline"
                  style={
                    likeCount !== 0
                      ? { color: blue[500] }
                      : { color: "#ffffff" }
                  }
                >
                  {likeCount}
                </Typography>
              </div>
            )}
          </ListItemAvatar>
          <ListItemText primary={props.goodThingText} />
        </ListItem>
      </>
    </div>
  );
}

export default TGTRecommend;
