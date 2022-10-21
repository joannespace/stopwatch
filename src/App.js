import React, { useState, useEffect, useReducer } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

function App() {
  const [hour, setHour] = useLocalStorage("hour");
  const [minute, setMinute] = useLocalStorage("minute");
  const [second, setSecond] = useLocalStorage("second");
  const [isClick, setIsClick] = useState(false);
  const [history, setHistory] = useState([]);
  const [ui, setUI] = useState("one");

  const handleRestart = (e) => {
    setHour("0");
    setMinute("0");
    setSecond("0");
    setIsClick(false);
  };

  const handleHistory = () => {
    setHistory([...history, { hour, minute, second }]);
  };

  useEffect(() => {
    if (isClick) {
      const interval = setInterval(() => setSecond(+second + 1), 1000);
      if (second === 60) {
        setMinute(+minute + 1);
        setSecond(0);
      }
      if (minute === 60) {
        setHour(+hour + 1);
        setMinute(0);
      }

      return () => {
        clearInterval(interval);
      };
    }
  });

  return (
    <div id="app-container">
      <div className="header">
        <h1>Stopwatch</h1>
        <div>
          <button onClick={() => setUI("one")}>1</button>
          <button onClick={() => setUI("two")}>2</button>
        </div>
      </div>

      <div className="timer">
        <div className="hour">
          {hour} : {minute} : {second}
        </div>

        <div className="button">
          <button className={ui} onClick={() => setIsClick(false)}>
            Stop
          </button>
          <button
            className={ui}
            onClick={() => setIsClick((prevState) => !prevState)}
          >
            Start
          </button>
          <button className={ui} onClick={handleRestart}>
            Restart
          </button>
          <button className={ui} onClick={handleHistory}>
            Record
          </button>
        </div>

        {isClick ? (
          <div className="history">
            <h3>History</h3>
            <div className="history-box">
              {history.map((record) => (
                <div className="history-line" id={Date.now()}>
                  {record.hour} : {record.minute} : {record.second}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="history">
            <h3>No record yet</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
