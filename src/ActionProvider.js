// ActionProvider starter code

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }
  weatherbotHandler = (botresponse) => {

    const message = this.createChatBotMessage(botresponse);
    this.setChatbotMessage(message);
  };
  setChatbotMessage = (message) => {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, message],
      }));
  };
}

export default ActionProvider;
