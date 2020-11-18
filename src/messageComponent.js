import React from 'react'
import './messageComponent.css'
import { TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';

class messageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: this.props.userName,
            messages: [],
            newMsg: ""
        };


        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getMessagesFromServer = this.getMessagesFromServer.bind(this);
        this.getMessagesFromServer()
    }

    getMessagesFromServer() {
        var getMessageRequest = new XMLHttpRequest();
        getMessageRequest.addEventListener('load', () => {
            
        })

        getMessageRequest.open('GET', 'http://localhost:5000/getmessages');
        console.log("get");
    }

    handleMessageChange(event) {
        this.setState({ newMsg: event.target.value })
    }

    sendMessage(event) {
        console.log('send')
        event.preventDefault();
        if (this.state.newMsg === "") return false;
        var newMessageObject = { sender: 1, message: this.state.newMsg };
        this.setState(state => {
            state.messages.push(newMessageObject);
        })
        this.setState({ newMsg: "" });
        document.getElementById('input-with-icon-grid').value = '';
        this.getMessagesFromServer();
    }

    // send message and clear the input area
    render() {
        return <div className="messageComponent">

            <div className="messages">
                {this.state.messages.map((msg) => <div className={msg.sender === 1 ? 'userMessage' : 'friendMessage'}>{msg.message}</div>)}
            </div>
            <form type="submit" onSubmit={this.sendMessage}>
                <Grid container className="messageGrid" alignItems="flex-end" justify="flex-start">
                    <Grid item xs={11}>
                        <TextField onChange={this.handleMessageChange} className="messageInput" id="input-with-icon-grid" label="Message" color="secondary" />
                    </Grid>
                    <Grid item xs={1}><SendIcon color="secondary" /></Grid>
                </Grid>
            </form>


        </div >
    }
}

export default messageComponent;


