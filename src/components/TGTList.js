import { useState, useEffect } from "react";
import React from "react";
import TGT from "./TGT";
import testData from "../util/testTGTList.json";
import Grid from "@material-ui/core/Grid";
import { config } from "../config";

function TGTList() {
  const [tgtList, setTGTList] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(true);

  useEffect(() => {
    const loadTGTList = async () => {
      const API_ENDPOINT = config.THREETER_API_ENDPOINT;
      const url = API_ENDPOINT + "v1/threetter/posts";
      let res;
      let data;
      try {
        res = await fetch(url, { method: "GET" });
        data = await res.json();
        setTGTList(data);
      } catch (e) {
        console.log(e);
        setApiSuccess(false);
        setTGTList(testData.testData);
      }
    };
    loadTGTList();
  }, []);

  return (
    <>
      <hr />
      {tgtList.length !== 0 && apiSuccess === true ? (
        <>
          <Grid container spacing={2}>
            {tgtList.map((data, idx) => {
              return (
                <>
                  <Grid item xs={6}>
                    <TGT userName={data.user.name} tgt={data.tgts} />
                  </Grid>
                </>
              );
            })}
          </Grid>
        </>
      ) : (
        <>
          <p>APIの実行に失敗しました。</p>
          <p>テスト用データを表示します。</p>
          {tgtList.map((data, idx) => {
            return (
              <>
                <TGT userName={data.user.name} tgt={data.tgts} />
                <hr />
              </>
            );
          })}
        </>
      )}
    </>
  );
}

export default TGTList;
