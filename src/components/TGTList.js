import { useState, useEffect } from "react";
import React from "react";
import TGT from "./TGT";
import testData from "../util/testTGTList.json";

function TGTList() {
  const [tgtList, setTGTList] = useState([]);
  const [apiSuccess, setApiSuccess] = useState(true);

  useEffect(() => {
    const loadTGTList = async () => {
      const url = "http://18.181.45.23:8080/v1/threetter/posts";
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
          {tgtList.map((data, idx) => {
            return (
              <>
                <TGT key={idx} userName={data.user.name} tgt={data.tgts} />
                <hr />
              </>
            );
          })}
        </>
      ) : (
        <>
          <p>APIの実行に失敗しました。</p>
          <p>テスト用データを表示します。</p>
          {tgtList.map((data, idx) => {
            return (
              <>
                <TGT key={idx} userName={data.user.name} tgt={data.tgts} />
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
