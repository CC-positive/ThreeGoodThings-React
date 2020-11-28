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

function MyTGTShingle(props) {
  const [likeCount, setLikeCount] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);

  useEffect(() => {
    const getMyTGT = async () => {
      const API_ENDPOINT = config.THREETER_API_ENDPOINT;
      const tgtId = props.tgtId;
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
        setLikeCount(data.likes);
        const userList = [];
        userList.push(data.likedUser);

        setLikedUsers(userList);
        console.log(likedUsers);
      } catch (e) {
        console.log(e);
      }
    };
    getMyTGT();
  }, []);

  return (
    <>
      {likedUsers.length !== 0 ? (
        <>
          <ListItem>
            <ListItemAvatar>
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
            </ListItemAvatar>
            <ListItemText primary={props.goodThingText} />
          </ListItem>
        </>
      ) : (
        <>
          <p>Now loading...</p>
        </>
      )}
    </>
  );
}

export default MyTGTShingle;
