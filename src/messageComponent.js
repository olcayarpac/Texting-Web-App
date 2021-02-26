import React from 'react'
import './messageComponent.css'
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import axios from 'axios';

class messageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      conversationId: this.props.conversation.conversationid,
      receiver: this.props.conversation.receiver,
      userid: this.props.userid,
      messages: [],
    };

    this.getMessages = this.getMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

  }


  getMessages() {
    axios({
      method: 'post',
      url: 'http://192.168.56.1:5000/getMessages',
      data: {
        id: this.state.conversationId
      },
    }).then((response) => {
      if(response){
        this.setState({
          messages: response.data.messages
        })
      }


    })
  }


  sendMessage(event) {
    // TODO write send message function
    event.preventDefault();
    var newMsg = document.getElementById('message').value;
    
    axios({
      method: 'post',
      url: 'http://192.168.56.1:5000/sendMessage',
      data: {
        senderid: this.state.userid,
        conversationid: this.state.conversationId,
        message: newMsg
      },
    }).then((response) => {
      document.getElementById('message').value = "";
    })
  }


  render() {
    this.getMessages();
    return (
      <div className="conversation">
        <script src='https://kit.fontawesome.com/a076d05399.js' crossOrigin='anonymous'></script>

        <div className="header">
          <div className="backButton" onClick={this.props.goBack}>
            <IconButton aria-label="delete">
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <div className="receiverName">
            {this.state.receiver}
          </div>
        </div>

        <div className="messagesBody">
          {
          this.state.messages.map((message, index) => (
            <div key={index} className={
              (message.senderid === this.state.userid) ? "msgBox sended" : "msgBox received"
            }>
              {message.msg}
            </div>
          ))}

        </div>

        <div className="bottom">
          <form onSubmit={this.sendMessage} className="messageForm">
            <input type="text" id="message" autoComplete="off" />
          </form>
        </div>
      </div>
    )
  }
}

export default messageComponent;


