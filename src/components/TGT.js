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

function TGT(props) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root} elevation={3}>
        <CardHeader
          className={classes.header}
          avatar={<Avatar alt="googleUserImg" src={props.imgUrl} />}
          title={props.userName}
          subheader={moment(props.upDate).fromNow()}
        />
        <CardContent>
          <List>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <ThumbUpAltRoundedIcon
                  style={{ color: blue[500], fontSize: 35 }}
                />
              </ListItemAvatar>
              <ListItemText primary={props.tgt.text1} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <ThumbUpAltRoundedIcon
                  style={{ color: blue[500], fontSize: 35 }}
                />
              </ListItemAvatar>
              <ListItemText primary={props.tgt.text2} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <ThumbUpAltRoundedIcon
                  style={{ color: blue[500], fontSize: 35 }}
                />
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
