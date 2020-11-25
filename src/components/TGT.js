import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import moment from "moment";
import "moment/locale/ja";
import {
  List,
  Avatar,
  Divider,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import SingleGoodThing from "./SingleGoodThing";

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
          subheader={moment(Date.parse(props.upDate)).fromNow()}
        />
        <CardContent>
          <List>
            <Divider variant="inset" component="li" />
            <SingleGoodThing
              goodThingText={props.tgt.text1}
              tgtId={props.tgt.id1}
              tokenId={props.tokenId}
              googleId={props.googleId}
            />
            <Divider variant="inset" component="li" />
            <SingleGoodThing
              goodThingText={props.tgt.text2}
              tgtId={props.tgt.id2}
              tokenId={props.tokenId}
              googleId={props.googleId}
            />
            <Divider variant="inset" component="li" />
            <SingleGoodThing
              goodThingText={props.tgt.text3}
              tgtId={props.tgt.id3}
              tokenId={props.tokenId}
              googleId={props.googleId}
            />
            <Divider variant="inset" component="li" />
          </List>
        </CardContent>
      </Card>
    </>
  );
}

export default TGT;
