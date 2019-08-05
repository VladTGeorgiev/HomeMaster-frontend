import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import API from './adapters/API';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUpForm from './components/SignUpForm'
import LogInForm from './components/LogInForm';
import Dashboard from './components/Dashboard';
class App extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      user: undefined,
      homeusers: [],
      homes: []
    }
  }

  componentDidMount() {
    API.validateUser()
      .then(data => {
        if (!data.user) {           
          window.history.pushState({}, "new state", "login");
          // display some error
        } else {
          this.setState({ user: data.user })
          window.history.pushState({}, "new state", "home");
          API.fetchUsers().then(homeusers => this.setState({homeusers: homeusers}))
          API.fetchHomes().then(homes => this.setState({homes: homes}))
        }}
      )
  }

  signUp = user => {
    API.signUp(user)
      .then(user => this.setState({ user }))
      window.history.pushState({}, "new state", "home");
  }

  logIn = user => {
    API.logIn(user)
      .then(user => this.setState({ user }))
      window.history.pushState({}, "new state", "home");
  }

  logOut = () => {
    API.clearToken()
    this.setState({ user: undefined })
    window.history.pushState({}, "new state", "login");
  }

  render() {
    return (
      <div className="App login">
        { this.state.user ?
          <div className="home">
            <Navbar user={this.state.user} logOut={this.logOut}/>
            <Dashboard user={this.state.user} homeusers={this.state.homeusers} homes={this.state.homes}/>
          </div>
        : 
          <div>
            <LogInForm user={this.state.user} submit={this.logIn}/>
            <SignUpForm submit={this.signUp}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
