import { useState, useEffect } from "react";
import React from "react";
import TGT from "./TGT";
import testData from "../util/testTGTList.json";
import Grid from "@material-ui/core/Grid";
import { config } from "../config";
import useInterval from "use-interval";
import "../styles/TGTList.css";

function TGTList(props) {
  const [tgtList, setTGTList] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(true);
  const [state, setState] = useState(0);

  useInterval(() => {
    setState(state + 1);
  }, 5000);

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
        // data = await res.json();
        setApiSuccess(true);
        setTGTList(data);
      } catch (e) {
        console.log(e);
        setApiSuccess(false);
        setTGTList(testData.testData);
      }
    };
    loadTGTList();
    console.log(tgtList);
  }, [state, props.toukouState]);

  return (
    <>
      {tgtList.length !== 0 && apiSuccess === true ? (
        <>
          <div className="grid-outline">
            <Grid container spacing={2}>
              {tgtList.map((data, idx) => {
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
                    <TGT
                      userName={data.user.name}
                      imgUrl={data.user.picture}
                      upDate={data.date}
                      tgt={data.tgts}
                      key={idx + data.id + "tgt"}
                      tokenId={props.idToken}
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

export default TGTList;
