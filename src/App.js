import React from 'react';
import './App.css';
import Login from './login'
import MessageComponent from './messageComponent'

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      userName: null 
    };

    this.doLogin = this.doLogin.bind(this);
    this.checkLoginSituation = this.checkLoginSituation.bind(this);
  }

  doLogin(username) {
    this.setState({isLoggedIn: true});
    this.setState({userName: username});
  }

  checkLoginSituation(){
    if(this.state.isLoggedIn === true) return true;
    else return false;
  }

  render() {
    var layout = (<Login doLogin={this.doLogin} />)
    if(this.checkLoginSituation()===true){
      layout = (<MessageComponent userName={this.state.userName}/>);
    }

    return (
      <div className="App">
        <header className="App-header">
          {layout}
        </header>
      </div>
    );
  }
}
export default App;
