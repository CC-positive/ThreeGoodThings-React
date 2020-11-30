import "../styles/MyTGTSingle.css";

function Test(props) {
  return (
    <div>
      <div className="popup" id="popup">
        <div className="inner">
          <p>{props.name}</p>
        </div>
        <a className="popup__close" href="#">
          X
        </a>
      </div>
    </div>
  );
}

export default Test;
