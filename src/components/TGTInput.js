import { useState
} from "react";
import React from "react";
import "../styles/TGTInput.css";

function TGTInput() {

  const [TGT1, setTGT1] = useState("");
  const [TGT2, setTGT2] = useState("");
  const [TGT3, setTGT3] = useState("");
  const [user, setUser] = useState("");

  const onButtonClick = () => {
    const posObj = {"userName":user,
                  "tgt1":TGT1,
                  "tgt2" :TGT2,
                  "tgt3":TGT3};
    //console.log(posObj)
    var request = new XMLHttpRequest();
    request.open('Post', "http://localhost:3000/v1/threetter/posts", true);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    // リクエストをURLに送信
    let json = JSON.stringify(posObj);
    request.send(json);
  }

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
          <span >First Good Thing:  </span>
          <input type="text" id="TGT1"  align="left" size="40" placeholder="朝ごはんのゆで卵が、いいかんじの半熟" onChange={handleInputChange1} className="TGTcon"/>
          <br/>
          <span>Second Good Thing:  </span>
          <input type="text" id="TGT2" size="40"　placeholder="朝決めたタスクが全て18時までに完了した" onChange={handleInputChange2} className="TGTcon"/>
          <br/>
          <span>Third Good Thing:  </span>
          <input type="text" id="TGT3" size="40"　placeholder="桃鉄が発売された" onChange={handleInputChange3}className="TGTcon"/>
          <br/>
          <span>User:  </span>
          <input type="text" onChange={handleInputChangeUser} id="user" />
          </form>
            <button type="button" value="Upload" onClick={onButtonClick} disabled={TGT1==="" ||TGT2==="" || TGT3==="" ||user===""}>
                投稿
            </button>
        </div>
    );
}

export default TGTInput;
