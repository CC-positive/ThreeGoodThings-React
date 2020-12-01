import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
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
    "& > *": {
      margin: theme.spacing(1),
    },
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
      setRecommendList(testData.testData);
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
        <div className={classes.root}>
          <Card className={classes.root} elevation={3}>
            <CardContent>
              <List>
                <Divider variant="inset" component="li" />
                <TGTRecommend
                  goodThingText={recommendList[0].tgtText}
                  tgtId={recommendList[0].tgtId}
                  tokenId={props.idToken}
                  googleId={props.googleId}
                />
                <Divider variant="inset" component="li" />
                <TGTRecommend
                  goodThingText={recommendList[1].tgtText}
                  tgtId={recommendList[1].tgtId}
                  tokenId={props.idToken}
                  googleId={props.googleId}
                />
                <Divider variant="inset" component="li" />
                <TGTRecommend
                  goodThingText={recommendList[2].tgtText}
                  tgtId={recommendList[2].tgtId}
                  tokenId={props.idToken}
                  googleId={props.googleId}
                />
                <Divider variant="inset" component="li" />
              </List>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            type="submit"
            className="submit-button"
            onClick={onRecommendClick}
          >
            一覧画面に戻る
          </Button>
        </div>
      ) : (
        <>
          <p>Now loading...</p>
        </>
      )}
    </>
  );
}

export default RecommendList;
