import React from 'react';
import './App.css';
// import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import API from './adapters/API';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUpForm from './components/SignUpForm'
import LogInForm from './components/LogInForm';
class App extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      user: undefined,
      homeusers: []
    }
  }

  componentDidMount() {
    API.validateUser()
      .then(data => {
        if (!data.user) {           
          window.history.pushState({}, "new state", "login");
          // display some error
          // this.props.history.push('/login')
        } else {
          this.setState({ user: data.user })
          window.history.pushState({}, "new state", "home");
          // this.props.history.push('/dashboard')  
         API.fetchData().then(homeusers => this.setState({homeusers: homeusers}))
        }}
      )
  }

  signUp = user => {
    {console.log(user)}
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
      <div className="App">
        { this.state.user ?
          <Navbar user={this.state.user} logOut={this.logOut}/>
        : 
          <div>
            <LogInForm user={this.state.user} submit={this.logIn}/>
            <span></span>
            <SignUpForm user={this.state.user} submit={this.signUp}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
