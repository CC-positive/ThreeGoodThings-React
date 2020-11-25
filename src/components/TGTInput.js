import { useState, createRef } from "react";
import React from "react";
import "../styles/TGTInput.css";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { config } from "../config";
import {
  Fab,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Typography,
} from "@material-ui/core";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import SendIcon from "@material-ui/icons/Send";
import "../styles/TGTInput.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  header: {
    marginBottom: -34,
  },
  avatar: {
    backgroundColor: blue[500],
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  thumsup: {
    backgroundColor: blue[500],
  },
  card: {
    ["@media (min-width:480px)"]: {
      // eslint-disable-line no-useless-computed-key
      width: "50%",
    },
    // width: 500,
    marginLeft: "auto",
    marginRight: "auto",
    // backgroundColor: lightBlue[50],
    marginBottom: 10,
    textAlign: "left",
  },
}));

function TGTInput(props) {
  const classes = useStyles();
  const [TGT1, setTGT1] = useState("");
  const [TGT2, setTGT2] = useState("");
  const [TGT3, setTGT3] = useState("");
  const inputTGT1Ref = createRef();
  const inputTGT2Ref = createRef();
  const inputTGT3Ref = createRef();

  const onButtonClick = () => {
    const API_ENDPOINT = config.THREETER_API_ENDPOINT;
    const posObj = {
      userName: props.userName,
      tgt1: TGT1,
      tgt2: TGT2,
      tgt3: TGT3,
    };
    var request = new XMLHttpRequest();
    request.open("Post", API_ENDPOINT + "v1/threetter/posts", true);
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.setRequestHeader("x-auth-token", props.idToken);
    request.setRequestHeader("x-googleid", props.googleId);
    setTGT1("");
    setTGT2("");
    setTGT3("");
    inputTGT1Ref.current.value = "";
    inputTGT2Ref.current.value = "";
    inputTGT3Ref.current.value = "";
    props.updatestate();
    props.reward(props.googleId, props.idToken);
    props.setToday(true);
    // リクエストをURLに送信
    let json = JSON.stringify(posObj);
    request.send(json);
  };

  function handleInputChange1(e) {
    setTGT1(e.target.value);
  }

  function handleInputChange2(e) {
    setTGT2(e.target.value);
  }

  function handleInputChange3(e) {
    setTGT3(e.target.value);
  }

  function handleInputChangeUser(e) {
    setUser(e.target.value);
  }

  return (
    <div className="TGTInput">
      <h2> 今日の3つの良いことを投稿しよう</h2>
      <div className="TGTInputCard">
        <Card className={classes.card} elevation={5}>
          <CardHeader
            className={classes.header}
            avatar={
              <Avatar
                className={classes.avatar}
                alt="googleUserImg"
                src={props.imgUrl}
              />
            }
            title={
              <Typography variant="h5" gutterBottom>
                {props.userName}
              </Typography>
            }
          />
          <CardContent color="red">
            <List>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemAvatar>
                  <ThumbUpAltRoundedIcon
                    style={{ color: blue[500], fontSize: 35 }}
                  />
                </ListItemAvatar>
                <TextField
                  id="TGT1"
                  label="良かったこと一つ目!"
                  style={{ margin: 8 }}
                  placeholder="朝ごはんのゆで卵が、いいかんじの半熟"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText={
                    TGT1.length === 0 ? "未入力です！" : TGT1.length + "文字"
                  }
                  inputRef={inputTGT1Ref}
                  onChange={handleInputChange1}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <ThumbUpAltRoundedIcon
                    style={{ color: blue[500], fontSize: 35 }}
                  />
                </ListItemAvatar>
                <TextField
                  id="TGT2"
                  label="良かったこと二つ目!"
                  style={{ margin: 8 }}
                  placeholder="桃鉄が発売された"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText={
                    TGT2.length === 0 ? "未入力です！" : TGT2.length + "文字"
                  }
                  inputRef={inputTGT2Ref}
                  onChange={handleInputChange2}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <ThumbUpAltRoundedIcon
                    style={{ color: blue[500], fontSize: 35 }}
                  />
                </ListItemAvatar>
                <TextField
                  id="TGT3"
                  label="良かったこと三つ目!"
                  style={{ margin: 8 }}
                  placeholder="朝決めたタスクが全て18時までに完了した"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText={
                    TGT3.length === 0 ? "未入力です！" : TGT3.length + "文字"
                  }
                  inputRef={inputTGT3Ref}
                  onChange={handleInputChange3}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </CardContent>
        </Card>
      </div>
      <Fab
        variant="extended"
        size="large"
        color="primary"
        aria-label="add"
        onClick={onButtonClick}
        disabled={TGT1 === "" || TGT2 === "" || TGT3 === ""}
      >
        <SendIcon />
        投稿
      </Fab>
    </div>
  );
}

export default TGTInput;
