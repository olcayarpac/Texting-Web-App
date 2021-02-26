import React from 'react';
import './App.css';
import Login from './login'
import Messages from './messages'
import axios from 'axios';

class App extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      isLoggedIn: false,
      userName: null,
      userId: null
    };

    this.doLogin = this.doLogin.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
  }

  doLogin(uname, pword) {
    // modify with a real login request 

    axios({
      method: 'post',
      url: 'http://192.168.56.1:5000/login',
      data: {
        username: uname,
        password: pword
      },
    }).then((response) => {
      
      if (response.data.auth === 'OK'){

        this.setState({
          userId: response.data.userid,
          userName: uname,
          isLoggedIn: true
        })
      }
      else {
        this.setState({
          invalidLogin: response.data.info
        })
      }
    })

  }

  checkLoginStatus() {
    if (this.state.isLoggedIn === true) return true;
    else return false;
  }

  render() {

    if (this.checkLoginStatus() === false) {
      return (
        <div className="App">
          <div className="App-header-login">
            <div className="loginComponent">
              <Login doLogin={this.doLogin} tryStatus={this.state.invalidLogin} />
            </div>
          </div>
        </div>
      )
    }

    if (this.checkLoginStatus() === true) {
      return (
        <div className="App">
          <div className="App-header">
            <div className="messagesComp" >
              <Messages userName={this.state.userName} userId={this.state.userId} />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default App;
