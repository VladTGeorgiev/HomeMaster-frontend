import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import API from './adapters/API';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUpForm from './components/SignUpForm'
import LogInForm from './components/LogInForm';
import Dashboard from './components/Dashboard';
import swal from 'sweetalert';

class App extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      user: undefined,
      data: []
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
          window.history.pushState({}, "new state", "home")
          API.fetchData().then(data => this.setState({data: data}))
        }}
      )
  }

  signUp = user => {
    API.signUp(user)
      .then(user => this.setState({ user }))
      window.history.pushState({}, "new state", "home")
      swal({
        title: "Success!",
        text: "You have signed up!",
        icon: "success",
        timer: 1500,
        buttons: false
        });
  }

  logIn = user => {
    API.logIn(user)
      .then(user => {
        if (user === undefined) {
          console.log('no user')
        } else {
          this.setState({ user })
          API.fetchData().then(data => this.setState({data: data}))
          window.history.pushState({}, "new state", "home")
          swal({
          title: "Success!",
          text: "You have logged in!",
          icon: "success",
          timer: 1500,
          buttons: false
          });
        }
      })
  }

  logOut = () => {
    API.clearToken()
    this.setState({ user: undefined, data: [] })
    window.history.pushState({}, "new state", "login")
    swal({
      title: "Success!",
      text: "You have logged out!",
      icon: "info",
      timer: 1500,
      buttons: false
      });
  }

  render() {
    return (
      <div className="App login">
        { this.state.user ?
          <div className="home">
            <Navbar user={this.state.user} logOut={this.logOut}/>
            <Dashboard user={this.state.user} data={this.state.data}/>
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
