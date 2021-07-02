// MessageParser starter code
import { waitFor } from "@testing-library/react";
import axios from "axios";
import getCurrSession from "./App";
const MSG_URL = "http://localhost:5000/api/watson/message";
var botresponse = "Nothing";
var current_msg = "";

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const getResponseMessage = async () => {
      console.log(
        "cur message " +
          current_msg +
          " in msg response" +
          localStorage.getItem("cursession").toString()
      );
     const body = {
        input: {
          message_type: "text",
          text: message,
        },
        sessionId: localStorage.getItem("cursession").toString(),
      };
       axios
        .post(MSG_URL, body)
        .then((getResponse) => {
          botresponse = getResponse.data.output.generic[0].text;
          console.log(getResponse.data);
          this.actionProvider.weatherbotHandler(botresponse);
        })
        .catch(function (error) {
          });
    };
    getResponseMessage();
  }
}

export default MessageParser;
