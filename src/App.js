import React from "react";
import { Chatbot } from "react-chatbot-kit";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import config from "./config";
import "./App.css";
import axios from "axios";
require('dotenv').config({path: __dirname + '/.env'});

const BASE_URL = "http://localhost:5000/api/watson/session";
const MSG_URL = "http://localhost:5000/api/watson/message";
var botresponse="Nothing";

const createSession = async () => {
  console.log(" inside create 1");
  axios
    .get(BASE_URL)
    .then((getResponse) => {
      localStorage.setItem("cursession", getResponse.data["session_id"]);      
    })
    .catch(function (error) {
     });
};

createSession();
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </header>
    </div>
  );
}

export default App;
