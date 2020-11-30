import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ja";
import testData from "../util/testTGTList.json";
import Grid from "@material-ui/core/Grid";
import {
  List,
  Avatar,
  Divider,
  Card,
  CardHeader,
  CardContent,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import MyTGT from "./MyTGT";
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

function MyTGTList(props) {
  const [myTGTData, setMyTGTData] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(true);

  const getMyTGTList = async () => {
    const API_ENDPOINT = config.THREETER_API_ENDPOINT;
    const url = API_ENDPOINT + "v1/threetter/posts";
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
      setApiSuccess(true);
      setMyTGTData(data);
    } catch (e) {
      console.log(e);
      setApiSuccess(false);
      setMyTGTData(testData.testData);
    }
  };

  /*const pushMyTGTList = async () => {
      for (let key in myTGTData) {
        await myTGTList.push(
            <>
            <Divider variant="inset" component="li" />
                <MyTGT
                  goodThingText={myTGTData[key].tgtText}
                  tgtId={myTGTData[key].tgtId}
                  tokenId={props.tokenId}
                  googleId={props.googleId}
                />
                </>
        );
      }
 

  }*/

  useEffect(() => {
    getMyTGTList();
    //pushMyTGTList();
    console.log("test");
    console.log(myTGTData);
  }, []);

  const classes = useStyles();
  return (
    <>
      {myTGTData.length !== 0 ? (
        <>
          <div className="grid-outline">
            <Grid container spacing={2}>
              {myTGTData.map((data, idx) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                    xl={3}
                    key={idx + data.id + "grid"}
                  >
                    <MyTGT
                      userName={myTGTData[idx].user.name}
                      imgUrl={myTGTData[idx].user.picture}
                      upDate={myTGTData[idx].date}
                      goodThingText={myTGTData[idx].tgts.text1}
                      tgtId={myTGTData[idx].id}
                      tgt={myTGTData[idx].tgts}
                      tokenId={props.tokenId}
                      googleId={props.googleId}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </>
      ) : (
        <>
          <p>Now loading...</p>
        </>
      )}
    </>
  );
}

export default MyTGTList;
