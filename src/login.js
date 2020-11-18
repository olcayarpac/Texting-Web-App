import React from 'react'
import TextField from '@material-ui/core/TextField'

class Login extends React.Component {

    constructor(){
        super();
        this.login = this.login.bind(this);
    }
    login(event) {
        event.preventDefault();
        var userName = document.getElementById('outlined-basic-username').value;
        this.props.doLogin(userName);
    }

    render() {
        return (
            <div className="Login">
                <form type="submit" onSubmit={this.login} className="loginForm" noValidate autoComplete="off">
                    <TextField id="outlined-basic-username" label="Username" variant="outlined" color="secondary" />
                </form>
            </div>
        );
    }

}
export default Login;
