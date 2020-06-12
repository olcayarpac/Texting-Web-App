import React from 'react'
import './messageComponent.css'
import { TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';

class messageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [
                { sender: 1, text: "hello" },
                { sender: 2, text: "hello you" },
                { sender: 1, text: "how are you" },
                { sender: 2, text: "im fine" }
            ],
            newMsg: ""
        };

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    handleMessageChange(event){
        this.setState({newMsg: event.target.value});
    }

    sendMessage(event){
        event.preventDefault();
        if(this.state.newMsg === "") return false;
        var newMessageObject = { sender: 1, text : this.state.newMsg};
        this.setState(state=>{
            state.messages.push(newMessageObject);
        })   
        this.setState({newMsg: ""});
        document.getElementById('input-with-icon-grid').value = '';
    }

    clearInput(event){

    }

    render() {
        return <div className="messageComponent">
            <div className="messages">
                {this.state.messages.map((msg) => <div className={msg.sender === 1 ? 'userMessage' : 'friendMessage'}>{msg.text}</div>)}
            </div>
             <form type="submit" onSubmit={this.sendMessage}>
                <Grid container className="messageGrid" alignItems="flex-end" justify="flex-start">
                    <Grid Item xs={11}>
                        <TextField  onChange= {this.handleMessageChange} className="messageInput" id="input-with-icon-grid" label="Message" color="secondary" />
                    </Grid>
                    <Grid Item xs={1}><SendIcon color="secondary" /></Grid>
                </Grid>
            </form>

           
        </div >
    }
}

export default messageComponent;


