import React from 'react'
import './messageComponent.css'
import { TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';

class messageComponent extends React.Component {
    render() {
        return <div className="messageComponent">
            <div className="messages">
                   
            </div>
            <Grid container className="messageGrid" alignItems="flex-end" justify="flex-start">
                <Grid Item xs={11}>
                <TextField className="messageInput" id="input-with-icon-grid" label="Message" color="secondary" />
            </Grid>
            <Grid Item xs={1}><SendIcon color="secondary" /></Grid>
            </Grid>
        </div >
    }
}

export default messageComponent;


