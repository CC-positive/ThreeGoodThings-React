import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import moment from "moment";
import "moment/locale/ja";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import { blue } from "@material-ui/core/colors";
import { config } from "../config";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },
  avatar: {
    backgroundColor: blue[500],
  },
  header: {
    marginBottom: -20,
  },
}));

function SingleGoodThing(props) {
  useEffect(() => {
    const loadTGTLike = async () => {
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
            "x-auth-token": props.idToken,
            "x-googleid": props.googleId,
          },
        });
        data = await res.json();
        console.log(props.googleId);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    loadTGTLike();
  }, []);

  const classes = useStyles();
  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <ThumbUpAltRoundedIcon style={{ color: blue[500], fontSize: 35 }} />
        </ListItemAvatar>
        <ListItemText primary={props.goodThingText} />
      </ListItem>
    </>
  );
}

export default SingleGoodThing;
