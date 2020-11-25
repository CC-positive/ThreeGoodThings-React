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
