import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import moment from "moment";
import "moment/locale/ja";
import MyTGTShingle from "./MyTGTShingle";
import {
  List,
  Avatar,
  Divider,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import { blue } from "@material-ui/core/colors";
import { config } from "../config";
import useInterval from "use-interval";

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

function MyTGT(props) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root} elevation={3}>
        <CardHeader
          className={classes.header}
          avatar={<Avatar alt="googleUserImg" src={props.imgUrl} />}
          title={props.userName}
          subheader={moment(Date.parse(props.upDate)).fromNow()}
        />
        <CardContent>
          <List>
            <Divider variant="inset" component="li" />
            <MyTGTShingle
              goodThingText={props.tgt.text1}
              tgtId={props.tgt.id1}
              tokenId={props.tokenId}
              googleId={props.googleId}
              updateName={props.updateName}
              name={props.name}
            />
            <Divider variant="inset" component="li" />
            <MyTGTShingle
              goodThingText={props.tgt.text2}
              tgtId={props.tgt.id2}
              tokenId={props.tokenId}
              googleId={props.googleId}
              updateName={props.updateName}
              name={props.name}
            />
            <Divider variant="inset" component="li" />
            <MyTGTShingle
              goodThingText={props.tgt.text3}
              tgtId={props.tgt.id3}
              tokenId={props.tokenId}
              googleId={props.googleId}
              updateName={props.updateName}
              name={props.name}
            />
            <Divider variant="inset" component="li" />
          </List>
        </CardContent>
      </Card>
    </>
  );
}

export default MyTGT;
