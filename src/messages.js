import React from 'react'
import './messages.css'
import axios from 'axios';
import MessageComponent from './messageComponent'

class messages extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      isConversationOpened: false,
      userName: this.props.userName,
      userId: this.props.userId,
      messages: []
    };

    this.getMessageList = this.getMessageList.bind(this);
    this.openConversation = this.openConversation.bind(this);
    this.closeConversation = this.closeConversation.bind(this);
  }

  getMessageList() {

    axios({
      method: 'post',
      url: 'http://192.168.56.1:5000/getConversations',
      data: {
        userid: this.state.userId,
      },
    }).then((response) => {

      if(response)
      {
        this.setState({
          messages: response.data
        })
      }

    })
  }

  openConversation(conv) {
    this.setState({ isConversationOpened: {
      conversationid: conv.conversationid,
      receiver: conv.receiver
    } });
  }

  closeConversation(){
    this.setState({ isConversationOpened: false});
  }


  render() {

    this.getMessageList();

    if (this.state.isConversationOpened === false) {
      return (
        <div className="messagesPage">
          <button className="newMsgButton">New Message</button>
          {this.state.messages.map((message, index) => (
            <div className="messageBox" key={message.conversationid} onClick={(key) => this.openConversation(message)}>
              <div className="receiverName">{message.receiver}</div>
            </div>
          ))}
        </div>
      )
    }

    else {
      return (
        <MessageComponent userid={this.state.userId} 
        conversation={this.state.isConversationOpened} 
        goBack={this.closeConversation}/>
      )
    }
  }

}

export default messages;


