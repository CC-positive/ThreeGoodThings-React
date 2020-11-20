import { useState, useEffect } from "react";
import React from "react";


function TGTInput() {

  const [TGT1, setTGT1] = useState("");
  const [TGT2, setTGT2] = useState("");
  const [TGT3, setTGT3] = useState("");
  const [user, setUser] = useState("");

  const onButtonClick = () => {
    console.log(document.forms.form.TGT1.value)
  };

  function handleInputChange1(e) {
    setTGT1(e.target.value)
  }

  function handleInputChange2(e) {
    setTGT2(e.target.value)
  }

  function handleInputChange3(e) {
    setTGT3(e.target.value)
  }

  function handleInputChangeUser(e) {
    setUser(e.target.value)
  }

    return (
        <div className="TGTInput">
          <h2> 今日あった3つの良いことをつぶやきましょう</h2>
          <form  id="form">
          <span>One Good Thing:</span>
          <input type="text" id="TGT1" placeholder="キーワードを入力" onChange={handleInputChange1} className="TGTcon"/>
          <br/>
          <span>Second Good Thing:</span>
          <input type="text" id="TGT2" placeholder="キーワードを入力" onChange={handleInputChange2}className="TGTcon"/>
          <br/>
          <span>Third Good Thing:</span>
          <input type="text" id="TGT3" placeholder="キーワードを入力" onChange={handleInputChange3}className="TGTcon"/>
          <br/>
          <input type="text" onChange={handleInputChangeUser} id="user" />
          </form>
            <button type="button" value="Upload" onClick={onButtonClick} disabled={TGT1==="" ||TGT2==="" || TGT3==="" ||user===""}>
                投稿
            </button>
        </div>
    );
}

export default TGTInput;
