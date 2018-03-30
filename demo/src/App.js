import React, { Component } from 'react';
import logo from './github.svg';
import './App.css';
import axios from 'axios';
import Profile from './Profile';
import RepoDetails from './RepoDetails';

class App extends Component {

  constructor() {
    super();
    this.state = { userName: '', hideButton: false, data: {} };
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onSeeProfileClick = this.onSeeProfileClick.bind(this);
  }

  componentDidMount(){
    console.log("componentDidMount");
  }

  componentDidUpdate(){
    console.log("componentDidUpdate");
  }

  componentWillMount(){
    console.log("componentWillMount");
  }

  componentWillUpdate(){
    console.log("componentWillUpdate");
  }

  componentDidCatch(){
    console.log("componentDidCatch");    
  }

  componentWillReceiveProps(){
    console.log("componentWillReceiveProps");    
  }

  componentWillUnmount(){
    console.log("componentWillUnmount");        
  }

  shouldComponentUpdate(){
    console.log("shouldComponentUpdate");    
    return true;        
  }

  onUserNameChange(event) {
    const { value } = event.target;

    this.setState({
      userName: value
    });
  }

  onSeeProfileClick(event) {
    this.setState({
      hideButton: true
    });
    // console.log(event.target.value);
    const promise1 = axios.get(`https://github-user.now.sh?username=${this.state.userName}`);
    const promise2 = axios.get(`https://api.github.com/users/${this.state.userName}/repos`);

    // const promise1 = axios.get(`http://api.myjson.com/bins/1auo1z`);
    // const promise2 = axios.get(`http://api.myjson.com/bins/14yh5z`);

    Promise.all([promise1, promise2]).then(response => {
      const information = {
        ...response[0].data,
        repos: response[1].data
      };

      console.log("information", information);
      this.setState({
        hideButton: false,
        data: information
      })
      console.log("response", response);
    }, error => console.log("error", error))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload..
        </p>
        <input type="text" value={this.state.userName}
          onChange={this.onUserNameChange} />
        {!this.state.hideButton && <button onClick={this.onSeeProfileClick} >See Profile</button>}

        {this.state.data &&
          <Profile avatar={this.state.data.avatar} description={this.state.data.description} />}

        {this.state.data &&
          <div>
            {
              this.state.data.repos &&
              <RepoDetails repos={this.state.data.repos} />
            }

          </div>
        }
      </div>
    );
  }
}

export default App;
