import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => { console.log('Service Worker Registered'); });
}

const Light = ({ status }) => {
  return (
    <div className="light">
      <div className={`light__dot light__dot--${status}`} />
    </div>
  );
}

const Root = () => {

  let a1Status = "reset";
  let a2Status = "reset";
  let a3Status = "reset";

  const [ selectedA1, selectA1 ] = useState('reset');
  const [ selectedA2, selectA2 ] = useState('reset');
  const [ selectedA3, selectA3 ] = useState('reset');

  const KEYS = {
    "55": [0, "valid"],
    "52": [0, "not_valid"],
    "49": [0, "reset"],

    "56": [1, "valid"],
    "53": [1, "not_valid"],
    "50": [1, "reset"],

    "57": [2, "valid"],
    "54": [2, "not_valid"],
    "51": [2, "reset"],

  };
  const SET_SELECTS = [ selectA1, selectA2, selectA3 ];

  const checkKeyPress = (e) => {
    const { keyCode } = e;
    if (KEYS[keyCode]) {
      const [ aIndex, status ] = KEYS[keyCode];
      SET_SELECTS[aIndex](status);
      if (status === "reset") {
        SET_SELECTS[0]("reset");
        SET_SELECTS[1]("reset");
        SET_SELECTS[2]("reset");
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", checkKeyPress);
    return () => {
      window.removeEventListener("keydown", checkKeyPress);
    };
  }, []);

  if (selectedA1 !== "reset" && selectedA2 !== "reset" && selectedA3 !== "reset") {
    const isValid = [selectedA1, selectedA2, selectedA3].reduce((prev, curr) => prev + (curr === "valid" ? 1 : 0), 0) >= 2;
    return (
      <div className="wrap">
        <h1 className="result">{isValid ? '✅' : '❌'}</h1>
        <div className="wrap__lights">
          <Light status={selectedA1} />
          <Light status={selectedA2} />
          <Light status={selectedA3} />
        </div>
      </div>
    );
  }
  return (
    <div className="wrap">
      <h1 className="result"></h1>
      <div className="wrap__lights">
        <Light status="reset" />
        <Light status="reset" />
        <Light status="reset" />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
