import { useState, useRef } from "react";
import React from "react";
import "../styles/TGTInput.css";
import Fab from "@material-ui/core/Fab";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import { config } from "../config";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  header: {
    marginBottom: -44,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  card: {
    width: 500,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: blue[100],
    marginBottom: 10,
  },
  TGTcon: {
    marginBottom: 5,
  },
  TGT: {
    marginLeft: "-5%",
  },
  user: {
    marginBottom: 5,
    marginLeft: "-15%",
  },
}));

function TGTInput(props) {
  const classes = useStyles();
  const [TGT1, setTGT1] = useState("");
  const [TGT2, setTGT2] = useState("");
  const [TGT3, setTGT3] = useState("");
  const [user, setUser] = useState("");
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();

  const onButtonClick = () => {
    const API_ENDPOINT = config.THREETER_API_ENDPOINT;
    const posObj = { userName: user, tgt1: TGT1, tgt2: TGT2, tgt3: TGT3 };
    var request = new XMLHttpRequest();
    request.open("Post", API_ENDPOINT + "v1/threetter/posts", true);
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    setTGT1("");
    setTGT2("");
    setTGT3("");
    setUser("");
    inputRef1.current.value = "";
    inputRef2.current.value = "";
    inputRef3.current.value = "";
    inputRef4.current.value = "";
    props.updatestate();
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
      <h2> 今日あった3つの良いことをつぶやきましょう</h2>
      <div className="TGTInputCard">
        <Card className={classes.card} alignItems="center" justify="center">
          <CardHeader
            className={classes.header}
            avatar={<Avatar alt="googleUserImg" src={props.imgUrl} />}
          />
          <CardContent color="red">
            <div className={classes.TGT}>
              <div className={classes.user}>
                <form id="form">
                  <span>UserName: </span>
                  <input
                    type="text"
                    ref={inputRef4}
                    placeholder="ゆうた"
                    onChange={handleInputChangeUser}
                    id="user"
                    className="TGTcon"
                    value={props.userName}
                  />
                </form>
              </div>
              <div className={classes.TGTcon}>
                <span>First Good Thing: </span>
                <input
                  type="text"
                  ref={inputRef1}
                  id="TGT1"
                  size="40"
                  placeholder="朝ごはんのゆで卵が、いいかんじの半熟"
                  onChange={handleInputChange1}
                />
              </div>
              <div className={classes.TGTcon}>
                <span>Second Good Thing: </span>
                <input
                  type="text"
                  ref={inputRef2}
                  id="TGT2"
                  size="40"
                  placeholder="朝決めたタスクが全て18時までに完了した"
                  onChange={handleInputChange2}
                  className="TGTcon"
                />
              </div>
              <div className={classes.TGTcon}>
                <span>Third Good Thing: </span>
                <input
                  type="text"
                  ref={inputRef3}
                  id="TGT3"
                  size="40"
                  placeholder="桃鉄が発売された"
                  onChange={handleInputChange3}
                  className="TGTcon"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Fab
        variant="extended"
        size="large"
        color="primary"
        aria-label="add"
        onClick={onButtonClick}
        disabled={TGT1 === "" || TGT2 === "" || TGT3 === "" || user === ""}
      >
        投稿
      </Fab>
    </div>
  );
}

export default TGTInput;
