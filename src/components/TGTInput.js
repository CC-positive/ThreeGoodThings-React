// import { useState, useEffect } from "react";
import React from "react";

const onButtonClick = () => {
    console.log("検証")
};

function TGTInput() {
    return (
        <div className="TGTInput">
            <p>ここTgtInputです</p>
            <button type="button" value="Upload" onClick={onButtonClick}>
                Upload
            </button>
        </div>
    );
}

export default TGTInput;
