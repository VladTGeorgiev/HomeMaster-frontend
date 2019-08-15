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
import MovingHome from './components/MovingHome';

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
          if (this.state.user.home_id === 1) {
            this.props.history.push(`/join-a-home`)
          } else {
            this.props.history.push(`/dashboard`)
            API.fetchData().then(data => this.setState({data: data}))
            if (this.state.user === undefined) {
              swal({
                title: "Error!",
                text: "These details doesn't seem to match any records. Please try again",
                icon: "warning",
                timer: 2000,
                buttons: false
                });
            } else {
              setTimeout(this.checkCookiePolicyAgreement, 3000);
            }
          }
        }}
      )
  }

  ///////// LOGIN/SIGNUP
  signUp = user => {
      API.signUp(user)
      .then(user => {
        this.setState({ user })
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
            timer: 2000,
            buttons: false
            })
            this.props.history.push(`/signup`)
        }
      })
      

  }

//   updateBillSplits = (users, bills) => {
// console.log(users, bills)
//   }

  logIn = user => {
    API.logIn(user)
      .then(user => {
        if (user === undefined) {
          swal({
            title: "Error!",
            text: "These details doesn't seem to match any records. Please try again",
            icon: "warning",
            timer: 2000,
            buttons: false
            });
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

  redirectToMovingHome = () => {
    this.props.history.push(`/moving-home`)
  }

  ///////// CRUD

  // USER
  updateUser = userNewInfo => {
    this.updateThisUser(this.state.user, userNewInfo)
    .then(user => this.setState({ user },this.componentDidMount(), this.props.history.push(`/dashboard`)))
    swal({
      title: "Success!",
      text: "You have changed your details!",
      icon: "success",
      timer: 1500,
      buttons: false
      });
  }

  updateThisUser = (current_user, user) =>
    fetch(`${API.usersUrl}/${current_user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: API.token() 
        },
        body: JSON.stringify({ user })
        }).then(API.jsonify)
        .then(data => {
            localStorage.setItem('token', API.token())
            return data.user
        })
        .catch(API.handleServerError)

  moveToNewHome = (home_key) => {
    if (this.state.data.bill_splits === undefined) {
      fetch('http://localhost:3000/api/v1/homes', {
        headers: {Authorization: API.token()}
        }).then(res => res.json())
        .then(homes => this.findHome(homes, home_key))
        // .then(home => this.updateUserHome(home))
    } else {
      if (this.state.data.bill_splits.length > 0) {
        swal({
          title: "Error!",
          text: "You must delete all your bills first",
          icon: "warning",
          timer: 2000,
          buttons: false
          })
      } else {
        fetch('http://localhost:3000/api/v1/homes', {
          headers: {Authorization: API.token()}
          }).then(res => res.json())
          .then(homes => this.findHome(homes, home_key))
          // .then(home => this.updateUserHome(home))
      }
    }

  }


  findHome = (homes, home_key) => {
    let newHome = homes.find(home => home.id === parseInt(home_key))
    if (newHome === undefined || home_key === '1') {
      swal({
        title: "Error!",
        text: "The home key you entered in not valid. Please check the key and try again.",
        icon: "warning",
        timer: 2000,
        buttons: false
        })
    } else {
      this.updateUserHome(newHome)
    }
  }

  updateUserHome = (home) => {
    let user = {
      id: this.state.user.id,
      home_id: home.id
    }
    if (this.state.data.users !== undefined) {
      if (this.state.data.users.length === 1) {
        // let bills = this.state.data.bills
        let tasks = this.state.data.tasks
        // bills.map(bill => this.deleteThisBill(bill))
        tasks.map(task => this.deleteTask(task))
        this.updateUserAfterMovingHome(user)
      } else {
        this.assignTasksToOtherUsers(user)
        this.updateUserAfterMovingHome(user)
      }
    } else {
      this.updateUserAfterMovingHome(user)
    }
  }

  updateUserAfterMovingHome = userNewInfo => {
    this.updateThisUser(this.state.user, userNewInfo)
    .then(user => this.setState({ user },this.componentDidMount(), this.props.history.push(`/dashboard`)))
    swal({
      title: "Success!",
      text: "You have changed your home!",
      icon: "success",
      timer: 1500,
      buttons: false
      })
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
        if (this.state.data.bill_splits.length > 0) {
          swal({
            title: "Error!",
            text: "You must delete all your bills first",
            icon: "warning",
            timer: 2000,
            buttons: false
            })
        } else {
          if (this.state.data.users.length === 1) {
            let tasks = this.state.data.tasks
            tasks.map(task => this.deleteTask(task))
          } else {
            this.assignTasksToOtherUsers(this.state.user)
          }
          this.deleteThisUser(this.state.user)
          API.clearToken()
          swal({
            title: "Success!",
            text: "You have deleted your profile!",
            icon: "success",
            timer: 1500,
            buttons: false
            });
            this.props.history.push(`/signup`)}
      } else {
          this.props.history.push(`/profile`)
        }
    });
  }

  deleteThisUser = (user) => {
        fetch(`${API.usersUrl}/${user.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: API.token() 
            },
            body: JSON.stringify({ user })
            })
    }

  removeBillSplits = (user) => {
    let bill_splits = this.state.data.bill_splits
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

  // createBillSplit = (user, bill, amount) => {
  //   const bill_split = {
  //       user_id: user.id,
  //       bill_id: bill.id,
  //       amount: amount,
  //       paid: false
  //   }
  //   fetch(API.billsplitsUrl, {
  //       method: 'POST',
  //       headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: API.token() 
  //       },
  //       body: JSON.stringify({
  //           bill_split
  //       })
  //       }).then(API.jsonify)
  //       .then(() => {
  //         API.fetchData().then(data => this.setState({data: data}))
  //       })
  //       .catch(API.handleServerError)
  // }

// HOME

  updateHome = newHome => {
    let home = {
      id: this.state.data.home.id,
      name: newHome.name,
      address_one: newHome.address_one,
      address_two: newHome.address_two,
      city: newHome.city,
      postcode: newHome.postcode
    }
    this.updateThisHome(home)
    this.props.history.push(`/dashboard`)
    swal({
      title: "Success!",
      text: "You have changed your home details!",
      icon: "success",
      timer: 1500,
      buttons: false
      });
  }

  updateThisHome = (home) => {
    fetch(`${API.homesUrl}/${home.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: API.token() 
        },
        body: JSON.stringify({ home })
        }).then(API.jsonify)
        .then(() => {
          API.fetchData().then(data => this.setState({data: data}))
        })
  }

  // submitNewHomeKey = (home_key) => {
  //   let home = {
  //     id: this.state.data.home.id,
  //     name: this.state.data.home.name,
  //     adrress_one: this.state.data.home.adrress_one,
  //     adrress_two: this.state.data.home.adrress_two,
  //     city: this.state.data.home.city,
  //     postcode: this.state.data.home.postcode,
  //     home_key: home_key
  //   }
  //   API.updateThisHome(home)
  //   API.fetchData().then(data => this.setState({data: data}))
  //   this.props.history.push(`/dashboard`)
  //   swal({
  //     title: "Success!",
  //     text: "You have changed your home details!",
  //     icon: "success",
  //     timer: 1500,
  //     buttons: false
  //     });
  // }

  createNewHome = (home) => {
    if (this.state.data.bill_splits.length > 0) {
      swal({
        title: "Error!",
        text: "You must delete all your bills first",
        icon: "warning",
        timer: 2000,
        buttons: false
        })
    } else {
      fetch(API.homesUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: API.token() 
        },
        body: JSON.stringify({ 
            home
        })
        }).then(data => data.json())
        .then(home => this.updateUserHome(home))
        .then(
        swal({
            title: "Success!",
            text: "You have created a new home!",
            icon: "success",
            timer: 1500,
            buttons: false
            })
        )
        .catch(API.handleServerError)
    }
  }

// BILLS

addNewBill = (bill) => {
  fetch(API.billsUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: API.token() 
      },
      body: JSON.stringify({ 
          bill
      })
      }).then(data => data.json())
      .then(data => this.createBillSplitsFromNewBillForUser(data.bill))
      .then(
      swal({
          title: "Success!",
          text: "You have added a new bill!",
          icon: "success",
          timer: 1500,
          buttons: false
          })
      )
      .catch(API.handleServerError)
}

createBillSplitsFromNewBillForUser = (bill) => {
  let user = this.state.user
  let amount = bill.total
  // let amount = (parseInt(bill.total)/parseInt(users.length))
  this.createBillSplit(user, bill, amount)
}

// createBillSplitsForParticipatingUsers = (bill) => {
//   let users = this.props.data.users
//   let amount = (parseInt(bill.total)/parseInt(users.length))
//   users.map(user => this.createBillSplit(user, bill, amount))
// }

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
      }).then(API.jsonify)
      .then(() => {
        API.fetchData().then(data => this.setState({data: data}))
      })
      .catch(API.handleServerError)
}

removeBill = (e, incomingData) => {
  let bill = incomingData
  swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      })
      .then((willDelete) => {
      if (willDelete) {
          // let bill_splits = this.state.data.bill_splits.filter(bill_split => bill_split.bill_id === bill.id)
          this.removeBillSplits(this.state.user)
          this.deleteThisBill(bill)
          swal({
          title: "Success!",
          text: "You have deleted the bill!",
          icon: "success",
          timer: 1500,
          buttons: false
          })
          .then(() => {
            API.fetchData().then(data => this.setState({data: data}))
          })
          // this.props.history.push(`/dashboard`)
      } else {
      //   this.props.history.push(`/dashboard`)
      }
  });
}



deleteThisBill = (bill, bill_splits) => {
  // bill_splits.map(bill_split => 
  //     fetch(`${API.billsplitsUrl}/${bill_split.id}`, {
  //         method: 'DELETE',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: API.token() 
  //         },
  //         body: JSON.stringify({ bill_split })
  //         }))
  fetch(`${API.billsUrl}/${bill.id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          Authorization: API.token() 
      },
      body: JSON.stringify({ bill })
      })
}

updateBillSplit = (billSplit) => {
  const bill_split = {
      id: billSplit.id,
      paid: !billSplit.paid
  }
  fetch(`${API.billsplitsUrl}/${billSplit.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Authorization: API.token() 
      },
      body: JSON.stringify({
          bill_split
      })
      }).then(API.jsonify)
      .then(() => {
        API.fetchData().then(data => this.setState({data: data}))
      })
      .catch(API.handleServerError)
}

addOtherBillsToCurrentUser = (bill, current_user) => {
  let users = this.state.data.users
  let all_bill_splits = this.state.data.all_bill_splits
  let bills_bill_splits = all_bill_splits.filter(split => split.bill_id === bill[0].id)
  let otherusers = users.filter(user => user.id !== current_user.id)
  let som = bills_bill_splits.map(split => split.user_id)
  console.log(som)
  let usersWithBillSplits = otherusers.filter(otheruser => som.map(s => s) === otheruser.id)
  console.log(bills_bill_splits, otherusers, usersWithBillSplits)
}

// TASKS

addNewTask = (task) => {
  fetch(API.tasksUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          Authorization: API.token() 
      },
      body: JSON.stringify({ 
          task
      })
      }).then(API.jsonify)
      .then(
      swal({
          title: "Success!",
          text: "You have added a new task!",
          icon: "success",
          timer: 1500,
          buttons: false
          })
      )
      .then(() => {
        API.fetchData().then(data => this.setState({data: data}))
      })
      .catch(API.handleServerError)
}

assignTasksToOtherUsers = (oldUser) => {
  let otherUser = this.state.data.users.find(user => user.id !== oldUser.id)
  let oldUserTasks = this.state.data.all_tasks.filter(task => task.user_id === oldUser.id)
  oldUserTasks.map(oldTask => this.assignTaskWhenDeletingUser(oldTask, otherUser))
}

assignTaskWhenDeletingUser = (oldTask, otherUser) => {
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
    .then(() => {
      API.fetchData().then(data => this.setState({data: data}))
    })
}

deleteTask = (task) => {
  fetch(`${API.tasksUrl}/${task.id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          Authorization: API.token() 
      },
      body: JSON.stringify({ task })
      })
      .then(() => {
        API.fetchData().then(data => this.setState({data: data}))
      })
}

updateTask = (newTask) => {
  const task = {
      id: newTask.id,
      completed: !newTask.completed
  }
  fetch(`${API.tasksUrl}/${newTask.id}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          Authorization: API.token() 
      },
      body: JSON.stringify({
          task
      })
      }).then(API.jsonify)
      .then(() => {
        API.fetchData().then(data => this.setState({data: data}))
      })
      .catch(API.handleServerError)
}

addTaskToCurrentUser = (oldTask, user) => {
  const task = {
      id: oldTask.id,
      user_id: user.id
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
      }).then(API.jsonify)
      .then(() => {
        API.fetchData().then(data => this.setState({data: data}))
      })
      .catch(API.handleServerError)
      swal({
          title: "Success!",
          text: "You have added the task to your list!",
          icon: "success",
          timer: 1500,
          buttons: false
          })
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
      .then(() => {
        API.fetchData().then(data => this.setState({data: data}))
      })
      .catch(API.handleServerError)
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
      .then(() => {
        API.fetchData().then(data => this.setState({data: data}))
      })
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
      }).then(API.jsonify)
      .then(() => {
        API.fetchData().then(data => this.setState({data: data}))
      })
      .catch(API.handleServerError)
}

  render() {
    return (
      <div>
        { this.state.user ?
          <div>
            <Route exact path="/dashboard" render={() => 
              <div>
                <Navbar user={this.state.user} logOut={this.logOut} redirectToDashboard={this.redirectToDashboard} redirectToUserProfile={this.redirectToUserProfile} redirectToMovingHome={this.redirectToMovingHome}/>
                <Dashboard user={this.state.user} data={this.state.data} redirectToHomeProfile={this.redirectToHomeProfile} 
                
                addNewEssential={this.addNewEssential} deleteEssential={this.deleteEssential} updateEssential={this.updateEssential} 
                
                deleteTask={this.deleteTask} addNewTask={this.addNewTask} updateTask={this.updateTask} addTaskToCurrentUser={this.addTaskToCurrentUser}
                
                addNewBill={this.addNewBill} removeBill={this.removeBill} updateBillSplit={this.updateBillSplit} addOtherBillsToCurrentUser={this.addOtherBillsToCurrentUser}
                />
              </div>
            } />
            <Route exact path="/profile" render={() => 
              <div>
                <Navbar user={this.state.user} logOut={this.logOut} redirectToDashboard={this.redirectToDashboard} redirectToUserProfile={this.redirectToUserProfile} redirectToMovingHome={this.redirectToMovingHome}/>
                <Profile user={this.state.user} updateUser={this.updateUser} deleteUser={this.deleteUser} redirectToCookiePolicy={this.redirectToCookiePolicy} />
              </div>
            } />
            <Route exact path="/home" render={() => 
              <div>
                <Navbar user={this.state.user} logOut={this.logOut} redirectToDashboard={this.redirectToDashboard} redirectToUserProfile={this.redirectToUserProfile} redirectToMovingHome={this.redirectToMovingHome}/>
                <Home user={this.state.user} data={this.state.data} submitNewHomeDetails={this.updateHome} submitNewHomeKey={this.submitNewHomeKey} />
              </div>
            } />
            <Route exact path="/cookie-policy" render={() => 
              <div>
                <Navbar user={this.state.user} logOut={this.logOut} redirectToDashboard={this.redirectToDashboard} redirectToUserProfile={this.redirectToUserProfile} redirectToMovingHome={this.redirectToMovingHome}/>
                <CookiePolicy/>
              </div>
            } />
            <Route exact path="/moving-home" render={() => 
              <div>
                <Navbar user={this.state.user} logOut={this.logOut} redirectToDashboard={this.redirectToDashboard} redirectToUserProfile={this.redirectToUserProfile} redirectToMovingHome={this.redirectToMovingHome}/>
                <MovingHome moveToNewHome={this.moveToNewHome} data={this.state.data} createNewHome={this.createNewHome}/>
              </div>
            } />
            <Route exact path="/join-a-home" render={() => 
              <div>
                {/* <Navbar user={this.state.user} logOut={this.logOut} redirectToDashboard={this.redirectToDashboard} redirectToUserProfile={this.redirectToUserProfile} redirectToMovingHome={this.redirectToMovingHome}/> */}
                <MovingHome moveToNewHome={this.moveToNewHome} data={this.state.data} createNewHome={this.createNewHome}/>
              </div>
            } />
          </div>
        :
          <div>
            <Route exact path="/login" render={() => 
              <LogInForm user={this.state.user} submit={this.logIn}/>
            } />
            <Route exact path="/signup" render={() => 
              <SignUpForm submit={this.signUp}/>
            } />
          </div>
        }
      </div>
    )
  }
}

export default withRouter(App);
