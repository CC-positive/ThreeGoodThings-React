import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
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
import ThumbUpAltSharpIcon from "@material-ui/icons/ThumbUpAltSharp";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },
}));

function TGT(props) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <CardHeader title={props.userName} subheader="November 20, 2020" />
        <CardContent>
          <List>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ThumbUpAltSharpIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={props.tgt.text1} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ThumbUpAltSharpIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={props.tgt.text2} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ThumbUpAltSharpIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={props.tgt.text3} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </CardContent>
      </Card>
    </>
  );
}

export default TGT;
