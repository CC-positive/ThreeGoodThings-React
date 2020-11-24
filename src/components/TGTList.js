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
      headers["Accept"] = "application/json";
      headers["Content-Type"] = "application/json";
      headers["x-auth-token"] = props.idToken;
      const header = JSON.stringify(headers);
      const method = "GET";

      let res;
      let data;
      try {
        res = await fetch(url, { method, header });
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
                <Grid item xs={6} key={idx + "grid"}>
                  <TGT
                    userName={data.user.name}
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
          <p>テスト用データを表示します。</p>
          <Grid container spacing={2}>
            {tgtList.map((data, idx) => {
              return (
                <Grid item xs={6} key={idx + "grid"}>
                  <TGT
                    userName={data.user.name}
                    tgt={data.tgts}
                    key={idx + "tgt"}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
}

export default TGTList;
