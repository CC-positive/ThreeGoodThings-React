import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ja";
import testData from "../util/testTGTList.json";
import {
  List,
  Avatar,
  Divider,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import TGTRecommend from "./TGTRecommend";
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

function RecommendList(props) {
  const [recommendList, setRecommendList] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(true);

  const onRecommendClick = () => {
    props.setRecommend(true);
  };

  const getRecommendList = async () => {
    const API_ENDPOINT = config.THREETER_API_ENDPOINT;
    const url = API_ENDPOINT + "v1/threetter/posts/?random=3";
    const headers = {};
    const header = JSON.stringify(headers);
    const method = "GET";

    let res;
    let data;
    try {
      data = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-auth-token": props.idToken,
          "x-googleid": props.googleId,
        },
      })
        .then((res) => res.json())
        .catch((e) => console.error(e));
      console.log("疎通OK");
      // data = await res.json();
      setApiSuccess(true);
      setRecommendList(data);
    } catch (e) {
      console.log(e);
      setApiSuccess(false);
      setTGTList(testData.testData);
      console.log("APIエラー");
    }
  };

  useEffect(() => {
    console.log("ゆーすえふぇくと");
    getRecommendList();
  }, []);

  const classes = useStyles();
  return (
    <>
      {recommendList.length !== 0 ? (
        <>
          <Card className={classes.root} elevation={3}>
            <CardContent>
              <List>
                <Divider variant="inset" component="li" />
                <TGTRecommend
                  goodThingText={recommendList[0].tgtText}
                  tgtId={recommendList[0].tgtId}
                  tokenId={props.tokenId}
                  googleId={props.googleId}
                />
                <Divider variant="inset" component="li" />
                <TGTRecommend
                  goodThingText={recommendList[1].tgtText}
                  tgtId={recommendList[1].tgtId}
                  tokenId={props.tokenId}
                  googleId={props.googleId}
                />
                <Divider variant="inset" component="li" />
                <TGTRecommend
                  goodThingText={recommendList[2].tgtText}
                  tgtId={recommendList[2].tgtId}
                  tokenId={props.tokenId}
                  googleId={props.googleId}
                />
                <Divider variant="inset" component="li" />
              </List>
            </CardContent>
          </Card>

          <p>
            {" "}
            <button
              type="submit"
              className="submit-button"
              onClick={onRecommendClick}
            >
              一覧画面に戻る
            </button>
          </p>
        </>
      ) : (
        <>
          <p>Now loading...</p>
        </>
      )}
    </>
  );
}

export default RecommendList;
