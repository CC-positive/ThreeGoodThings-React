import { useState, useEffect } from "react";
import React from "react";
import TGT from "./TGT";
import testData from "../util/testTGTList.json";
import Grid from "@material-ui/core/Grid";
import { config } from "../config";
import useInterval from "use-interval";

function TGTList(props) {
  const [tgtList, setTGTList] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(true);
  const [state, setState] = useState(0);

  useInterval(() => {
    setState(state + 1);
  }, 10000);

  useEffect(() => {
    const loadTGTList = async () => {
      const API_ENDPOINT = config.THREETER_API_ENDPOINT;
      const url = API_ENDPOINT + "v1/threetter/posts";
      const headers = {};
      const header = JSON.stringify(headers);
      const method = "GET";

      let res;
      let data;
      try {
        res = await fetch(url, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-auth-token": props.idToken,
          },
        });
        data = await res.json();
        setTGTList(data);
      } catch (e) {
        console.log(e);
        setApiSuccess(false);
        setTGTList(testData.testData);
      }
    };
    loadTGTList();
  }, [state, props.toukouState]);

  return (
    <>
      <hr />
      {tgtList.length !== 0 && apiSuccess === true ? (
        <>
          <Grid container spacing={2}>
            {tgtList.map((data, idx) => {
              return (
                <Grid item xs={4} key={idx + "grid"}>
                  <TGT
                    userName={data.user.name}
                    imgUrl={data.user.picture}
                    upDate={data.date}
                    tgt={data.tgts}
                    key={idx + "tgt"}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        <>
          <p>APIの実行に失敗しました。</p>
        </>
      )}
    </>
  );
}

export default TGTList;
