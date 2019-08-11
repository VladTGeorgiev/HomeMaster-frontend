import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import API from './adapters/API';
import SignUpForm from './components/SignUpForm'
import LogInForm from './components/LogInForm';
import Dashboard from './components/Dashboard';
import swal from '@sweetalert/with-react'
import {Route} from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import Profile from './components/Profile'
import Home from './components/Home'
import CookiePolicy from './components/CookiePolicy';
import { thisExpression } from '@babel/types';

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
          if (this.props.history.location.pathname === '/signup')
            this.props.history.push(`/signup`)
          else if (this.props.history.location.pathname === '/')
            this.props.history.push(`/login`)
          else
            this.props.history.push(`/login`)
        } else {
          this.setState({ user: data.user })
          this.props.history.push(`/dashboard`)
          API.fetchData().then(data => this.setState({data: data}))
          if (this.state.user === undefined) {
console.log('No user')
          } else {
            setTimeout(this.checkCookiePolicyAgreement, 3000);
          }
        }}
      )
      // .then(this.outstandingTasks())
  }

  ///////// LOGIN/SIGNUP
  signUp = user => {
    API.signUp(user)
      .then(user => this.setState({ user }))
      this.props.history.push(`/dashboard`)
      swal({
        title: "Success!",
        text: "You have signed up!",
        icon: "success",
        timer: 1500,
        buttons: false
        });
      setTimeout(this.checkCookiePolicyAgreement, 3000);

  }

  logIn = user => {
    API.logIn(user)
      .then(user => {
        if (user === undefined) {
          console.log('no user')
        } else {
          this.setState({ user })
          API.fetchData().then(data => this.setState({data: data}))
          this.props.history.push(`/dashboard`)
          swal({
          title: "Success!",
          text: "You have logged in!",
          icon: "success",
          timer: 1500,
          buttons: false
          });
        }
      })
      setTimeout(this.checkCookiePolicyAgreement, 3000);
  }

  logOut = () => {
    API.clearToken()
    this.setState({ user: undefined, data: [] })
    this.props.history.push(`/login`)
    swal({
      title: "Success!",
      text: "You have logged out!",
      icon: "info",
      timer: 1500,
      buttons: false
      });
  }

  checkCookiePolicyAgreement = () => {
    if (this.state.user.cookie_policy === false) {
      swal({
        title: "Cookie Policy",
        text: "This website uses cookies to improve service and provide tailored ads.",
        icon: "info",
        buttons: ["Cookie policy", "Agree"]
        })
        .then((willDelete) => {
          if (willDelete) {
            fetch(`${API.usersUrl}/${this.state.user.id}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: localStorage.getItem("token") 
              },
              body: JSON.stringify({ 
                cookie_policy: true
               })
              }).then(API.jsonify)
              .then(data => {
                  return data.user
              })
              .catch(API.handleServerError)
          } else {
            this.redirectToCookiePolicy()
          }
        });
    } else {
      this.redirectToDashboard()
    }
  }

  ///////// REDIRECTS
  redirectToDashboard = () => {
    this.props.history.push(`/dashboard`)
  }

  redirectToUserProfile = () => {
    this.props.history.push(`/profile`)
  }

  redirectToHomeProfile = () => {
    this.props.history.push(`/home`)
  }

  redirectToCookiePolicy = () => {
    this.props.history.push(`/cookie-policy`)
  }

  ///////// UPDATE - DELETE

  // USER
  updateUser = userNewInfo => {
    API.updateThisUser(this.state.user, userNewInfo)
    .then(user => this.setState({ user }))
    this.props.history.push(`/dashboard`)
    swal({
      title: "Success!",
      text: "You have changed your details!",
      icon: "success",
      timer: 1500,
      buttons: false
      });
  }

  deleteUser = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        API.deleteThisUser(this.state.user)
        API.clearToken()
        swal({
          title: "Success!",
          text: "You have deleted your profile!",
          icon: "success",
          timer: 1500,
          buttons: false
          });
          this.props.history.push(`/signup`)
      } else {
        this.props.history.push(`/profile`)
      }
    });
  }

  // HOME
  updateHome = home => {
    console.log(home)
    // API.updateThisHome(this.state.user, home)
    // .then(home => console.log(home))
    // API.fetchData().then(data => this.setState({data: data}))
    // this.props.history.push(`/dashboard`)
    swal({
      title: "Success!",
      text: "You have changed your details!",
      icon: "success",
      timer: 1500,
      buttons: false
      });
  }

  submitNewHomeId = (home) => {
    console.log(home)
    //have to update user home_id
  }

  render() {
    return (
      <div>
        { this.state.user ?
          <div>
            <Route exact path="/dashboard" render={() => 
              <div>
                <Navbar user={this.state.user} logOut={this.logOut} redirectToDashboard={this.redirectToDashboard} redirectToUserProfile={this.redirectToUserProfile}/>
                <Dashboard user={this.state.user} data={this.state.data} redirectToHomeProfile={this.redirectToHomeProfile}/>
              </div>
            } />
            <Route exact path="/profile" render={() => 
              <div>
                <Navbar user={this.state.user} logOut={this.logOut} redirectToDashboard={this.redirectToDashboard} redirectToUserProfile={this.redirectToUserProfile}/>
                <Profile user={this.state.user} updateUser={this.updateUser} deleteUser={this.deleteUser} redirectToCookiePolicy={this.redirectToCookiePolicy}/>
              </div>
            } />
            <Route exact path="/home" render={() => 
              <div>
                <Navbar user={this.state.user} logOut={this.logOut} redirectToDashboard={this.redirectToDashboard} redirectToUserProfile={this.redirectToUserProfile}/>
                <Home user={this.state.user} data={this.state.data} submitNewHomeDetails={this.updateHome} submitNewHomeId={this.submitNewHomeId} submitBillUpdate={this.updateHomeBills}/>
              </div>
            } />
            <Route exact path="/cookie-policy" render={() => 
              <div>
                <Navbar user={this.state.user} logOut={this.logOut} redirectToDashboard={this.redirectToDashboard} redirectToUserProfile={this.redirectToUserProfile}/>
                <CookiePolicy/>
              </div>
            } />
          </div>
        :
          <div>
            <Route exact path="/login" render={() => 
              <LogInForm user={this.state.user} submit={this.logIn}/>
            } />
            <Route exact path="/signup" component={() => 
              <SignUpForm submit={this.signUp}/>
            } />
          </div>
        }
      </div>
    )
  }
}

export default withRouter(App);
