import { useState, useEffect } from "react";
import React from "react";

function TGT(props) {
  return (
    <>
      <p>{props.userName}</p>
      <p>{props.tgt.text1}</p>
      <p>{props.tgt.text2}</p>
      <p>{props.tgt.text3}</p>
    </>
  );
}

export default TGT;
