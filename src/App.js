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
import { thisExpression } from 'babel-types';

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
      if (user) {
        this.props.history.push(`/dashboard`)
        swal({
          title: "Success!",
          text: "You have signed up!",
          icon: "success",
          timer: 1500,
          buttons: false
          })
        setTimeout(this.checkCookiePolicyAgreement, 3000)
        API.fetchData().then(data => this.setState({data: data}))
      } else {
        swal({
          title: "Error!",
          text: "Sign up unsuccesful!",
          icon: "warnig",
          timer: 1500,
          buttons: false
          })
          this.props.history.push(`/signup`)
      }

  }

//   updateBillSplits = (users, bills) => {
// console.log(users, bills)
//   }

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
    if (this.state.user === undefined) {
      this.props.history.push(`/login`)
    } else {
      if (this.state.user.cookie_policy === false) {
        swal({
          title: "Cookie Policy",
          text: "This website uses cookies to improve service and provide tailored ads.",
          icon: "info",
          buttons: ["Cookie policy", "Agree"],
          closeOnClickOutside: false
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

  moveToNewHome = (home_key) => {
    fetch('http://localhost:3000/api/v1/homes', {
      headers: {Authorization: API.token()}
      }).then(res => res.json())
      .then(homes => this.findHome(homes, home_key))
      .then(home => this.updateUserHome(home))
    //  update user.home_id to the matching home
  }

  findHome = (homes, home_key) => {
    let newHome = homes.find(home => home.id === parseInt(home_key))
    return newHome
  }

  updateUserHome = (home) => {
    let user = {
      id: this.state.user.id,
      home_id: home.id
    }
    this.updateUser(user)
    this.logOut()
  }

  updateUserHomeSignUp = (home, newUser) => {
    newUser = {
      home_id: home.id
    }
    this.updateUser(newUser)
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
        this.assignTasksToOtherUsers(this.state.user)
        this.removeBillSplits(this.state.user)
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

  assignTasksToOtherUsers = (oldUser) => {
    let otherUser = this.state.data.users.find(user => user.id !== oldUser.id)
    let oldUserTasks = this.state.data.all_tasks.filter(task => task.user_id === oldUser.id)
    oldUserTasks.map(oldTask => this.assignTask(oldTask, otherUser))
  }

  assignTask = (oldTask, otherUser) => {
    const task = {
      id: oldTask.id,
      user_id: otherUser.id
    }
    fetch(`${API.tasksUrl}/${oldTask.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Authorization: API.token() 
      },
      body: JSON.stringify({
          task
      })
      })
  }

  removeBillSplits = (user) => {
    let bill_splits = this.state.data.all_bill_splits
    bill_splits.map(bill_split =>     
      fetch(`${API.billsplitsUrl}/${bill_split.id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          Authorization: API.token() 
      },
      body: JSON.stringify({ bill_split })
      }))
      this.createNewBillSplitsForOtherUsers(user)
  }

  createNewBillSplitsForOtherUsers = (user) => {
    let bills = this.state.data.bills
    let allUsers = this.state.data.users
    let otherUsers = allUsers.filter(otherUser => otherUser.id !== user.id)
    otherUsers.map(leftUser => bills.map(bill => this.createBillSplitsFromNewBill(bill, otherUsers)))
  }

  createBillSplitsFromNewBill = (bill, otherUsers) => {
    let amount = (parseInt(bill.total)/parseInt(otherUsers.length))
    otherUsers.map(user => this.createBillSplit(user, bill, amount))
}

createBillSplit = (user, bill, amount) => {
    const bill_split = {
        user_id: user.id,
        bill_id: bill.id,
        amount: amount,
        paid: false
    }
    fetch(API.billsplitsUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: API.token() 
        },
        body: JSON.stringify({
            bill_split
        })
        }).then(API.jsonify).then(API.fetchData())
        .catch(API.handleServerError)
  }

  // HOME
  updateHome = home => {
    console.log(home)
    API.updateThisHome(home)
    API.fetchData().then(data => this.setState({data: data}))
    this.props.history.push(`/dashboard`)
    swal({
      title: "Success!",
      text: "You have changed your home details!",
      icon: "success",
      timer: 1500,
      buttons: false
      });
  }

  submitNewHomeKey = (home_key) => {
    let home = {
      id: this.state.data.home.id,
      name: this.state.data.home.name,
      adrress_one: this.state.data.home.adrress_one,
      adrress_two: this.state.data.home.adrress_two,
      city: this.state.data.home.city,
      postcode: this.state.data.home.postcode,
      home_key: home_key
    }
    API.updateThisHome(home)
    API.fetchData().then(data => this.setState({data: data}))
    this.props.history.push(`/dashboard`)
    swal({
      title: "Success!",
      text: "You have changed your home details!",
      icon: "success",
      timer: 1500,
      buttons: false
      });
  }


// ESSENTIALS

addNewEssential = (home, name) => {
  fetch(API.essentialsUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: API.token() 
      },
      body: JSON.stringify({ 
          name: name,
          more: false,
          home_id: home
       })
      }).then(API.jsonify)
      .then(
      swal({
          title: "Success!",
          text: "You have created a new hosehold item!",
          icon: "success",
          timer: 1500,
          buttons: false
          })
      )
      .catch(API.handleServerError)
      API.fetchData().then(data => this.setState({data: data}))
}

deleteEssential = (essential) => {
  fetch(`${API.essentialsUrl}/${essential.id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          Authorization: API.token() 
      },
      body: JSON.stringify({ essential })
      })
      API.fetchData().then(data => this.setState({data: data}))
}

updateEssential = (newEssential) => {
  const essential = {
      id: newEssential.id,
      more: !newEssential.more
  }
  fetch(`${API.essentialsUrl}/${newEssential.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Authorization: API.token() 
      },
      body: JSON.stringify({
          essential
      })
      }).then(API.jsonify).then(API.fetchData())
      .catch(API.handleServerError)
      API.fetchData().then(data => this.setState({data: data}))
}

  render() {
    return (
      <div>
        { this.state.user ?
          <div>
            <Route exact path="/dashboard" render={() => 
              <div>
                <Navbar user={this.state.user} logOut={this.logOut} redirectToDashboard={this.redirectToDashboard} redirectToUserProfile={this.redirectToUserProfile}/>
                <Dashboard user={this.state.user} data={this.state.data} redirectToHomeProfile={this.redirectToHomeProfile} addNewEssential={this.addNewEssential} deleteEssential={this.deleteEssential} updateEssential={this.updateEssential}/>
              </div>
            } />
            <Route exact path="/profile" render={() => 
              <div>
                <Navbar user={this.state.user} logOut={this.logOut} redirectToDashboard={this.redirectToDashboard} redirectToUserProfile={this.redirectToUserProfile}/>
                <Profile user={this.state.user} updateUser={this.updateUser} deleteUser={this.deleteUser} redirectToCookiePolicy={this.redirectToCookiePolicy} moveToNewHome={this.moveToNewHome}/>
              </div>
            } />
            <Route exact path="/home" render={() => 
              <div>
                <Navbar user={this.state.user} logOut={this.logOut} redirectToDashboard={this.redirectToDashboard} redirectToUserProfile={this.redirectToUserProfile}/>
                <Home user={this.state.user} data={this.state.data} submitNewHomeDetails={this.updateHome} submitNewHomeKey={this.submitNewHomeKey} />
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
