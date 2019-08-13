import React, { Component } from 'react';
import { Grid, Loader, Image, Segment, Container, Divider, Menu, Label } from 'semantic-ui-react'
import UsersCard from './UsersCard'
import HomeCard from '../components/HomeCard'
import BillsCard from '../components/BillsCard'
import TasksCard from '../components/TasksCard'
import EssentialsCard from '../components/EssentialsCard'
import Outstanding from '../components/Outstanding'
import API from '../adapters/API';
import swal from '@sweetalert/with-react'
import NewTask from '../components/NewTask'
import NewBill from '../components/NewBill'
import { thisExpression } from '@babel/types';

class Dashboard extends Component {
    state = { 
        activeItem: 'outstanding' 
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    buyFromAmazon = (e, name) => {
        window.open(
            'https://www.amazon.co.uk/s?k='+name, '_blank'
          );
      }
// ESSENTIALS
    removeEssential = (e, essential) => {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                this.props.deleteEssential(essential)
                swal({
                title: "Success!",
                text: "You have deleted the item!",
                icon: "success",
                timer: 1500,
                buttons: false
                })
                // this.props.history.push(`/dashboard`)
            } else {
            //   this.props.history.push(`/dashboard`)
            }
        });
    }

    addNewEssential = () => {
        swal({
                text: 'Enter the item name',
                content: "input",
                button: {
                text: "Add Item!",
                closeModal: false,
                },
                color: 'pink'
            })
            .then(name => {
                if (!name) throw null;
            
                return this.props.addNewEssential(this.props.data.home.id, name);
            })
            // .then(this.props.fetchData())
    }

    // updateEssential = (newEssential) => {
    //     const essential = {
    //         id: newEssential.id,
    //         more: !newEssential.more
    //     }
    //     fetch(`${API.essentialsUrl}/${newEssential.id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: API.token() 
    //         },
    //         body: JSON.stringify({
    //             essential
    //         })
    //         }).then(API.jsonify).then(API.fetchData())
    //         .catch(API.handleServerError)
    // }

// TASKS
    removeTask = (e, task) => {
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                API.deleteThisTask(task)
                swal({
                title: "Success!",
                text: "You have deleted the task!",
                icon: "success",
                timer: 1500,
                buttons: false
                })
                API.fetchData()
                // this.props.history.push(`/dashboard`)
            } else {
            //   this.props.history.push(`/dashboard`)
            }
        });
    }

    addNewTaskForm = () => {
          swal({
            buttons: {
            },
            content: (
              <div>
                <NewTask user={this.props.user} home={this.props.data.home} addNewTask={this.addNewTask}/>
                </div>
            )
          })
    }



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
            .catch(API.handleServerError)
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
            }).then(API.jsonify).then(API.fetchData())
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
            }).then(API.jsonify).then(API.fetchData())
            .catch(API.handleServerError)
            swal({
                title: "Success!",
                text: "You have added the task to your list!",
                icon: "success",
                timer: 1500,
                buttons: false
                });
    }

// BILLSPLITS
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
            }).then(API.jsonify).then(API.fetchData())
            .catch(API.handleServerError)
    }
    createBillSplitsFromNewBill = (bill) => {
        let users = this.props.data.users
        let amount = (parseInt(bill.total)/parseInt(users.length))
        users.map(user => this.createBillSplit(user, bill, amount))
    }

    createBillSplitsFromNewBillForUser = (bill) => {
        let user = this.props.user
        let amount = bill.total
        // let amount = (parseInt(bill.total)/parseInt(users.length))
        this.createBillSplit(user, bill, amount)
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

    
// BILLS
    addNewBillForm = () => {
        swal({
          buttons: {
          },
          content: (
            <div>
              <NewBill user={this.props.user} home={this.props.data.home} addNewBill={this.addNewBill}/>
              </div>
          )
        })
  }

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
            text: "You have added a new Bill!",
            icon: "success",
            timer: 1500,
            buttons: false
            })
        )
        .catch(API.handleServerError)
}

removeBill = (e, bill) => {
    swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        })
        .then((willDelete) => {
        if (willDelete) {
            let bill_splits = this.props.data.all_bill_splits
            API.deleteThisBill(bill_splits, bill)
            swal({
            title: "Success!",
            text: "You have deleted the bill!",
            icon: "success",
            timer: 1500,
            buttons: false
            })
            API.fetchData()
            // this.props.history.push(`/dashboard`)
        } else {
        //   this.props.history.push(`/dashboard`)
        }
    });
}

addOtherBillsToCurrentUser = (bill, current_user) => {
    let users = this.props.data.users
    let all_bill_splits = this.props.data.all_bill_splits
    let bills_bill_splits = all_bill_splits.filter(split => split.bill_id === bill[0].id)
    let otherusers = users.filter(user => user.id !== current_user.id)
    let som = bills_bill_splits.map(split => split.user_id)
    console.log(som)
    let usersWithBillSplits = otherusers.filter(otheruser => som.map(s => s) === otheruser.id)
    console.log(bills_bill_splits, otherusers, usersWithBillSplits)
}
q

    render() {
        const { activeItem } = this.state
        let displayedCard

        switch (this.state.activeItem) {
            case 'outstanding':
                displayedCard = <Outstanding user={this.props.user} data={this.props.data} updateTask={this.updateTask} updateBillSplit={this.updateBillSplit} updateEssential={this.updateEssential}/>
                break;
            case 'bills':
                displayedCard = <BillsCard user={this.props.user} bills={this.props.data.bills} bill_splits={this.props.data.bill_splits} all_bill_splits={this.props.data.all_bill_splits} removeBill={this.removeBill} addNewBillForm={this.addNewBillForm} updateBillSplit={this.updateBillSplit} addOtherBillsToCurrentUser={this.addOtherBillsToCurrentUser}
                // updateBill={this.updateBill}
                />
                break;
            case 'tasks':
                displayedCard = <TasksCard tasks={this.props.data.tasks} all_tasks={this.props.data.all_tasks} user={this.props.user} users={this.props.data.users} home={this.props.data.home} removeTask={this.removeTask} addNewTaskForm={this.addNewTaskForm} updateTask={this.updateTask} addTaskToCurrentUser={this.addTaskToCurrentUser}/>
                break;
            case 'Household essentials':
                displayedCard = <EssentialsCard essentials={this.props.data.essentials} buyFromAmazon={this.buyFromAmazon} removeEssential={this.removeEssential} addNewEssential={this.addNewEssential} updateEssential={this.props.updateEssential}/>
                break;
            default:
                displayedCard = <Outstanding data={this.props.data}/>
        }

        return (
            this.props.data.home ? 
                <Container>   
                    <Divider />
                    <Container>              
                        <HomeCard home={this.props.data.home} redirectToHomeProfile={this.props.redirectToHomeProfile}/>
                    </Container>
                    <Divider />
                    <Container >
                        <Menu attached='top' tabular>
                        <Menu.Item color='teal' name='outstanding' active={activeItem === 'outstanding'} onClick={this.handleItemClick} />
                        <Menu.Item color='yellow' name='bills' active={activeItem === 'bills'} onClick={this.handleItemClick}/>
                        <Menu.Item color='olive' name='tasks' active={activeItem === 'tasks'} onClick={this.handleItemClick}/>
                        <Menu.Item color='pink' name='Household essentials' active={activeItem === 'Household essentials'} onClick={this.handleItemClick}/>
                        </Menu>
                        <div>{displayedCard}</div>
                    </Container>
                    <Divider />
                    <Container >
                        <Label ribbon color="teal" size="large">Your housemates</Label>
                        <Grid columns={4}>
                            {this.props.data.users.map(user => <Grid.Column key={user.id} mobile={16} tablet={8} computer={4}><UsersCard  user={user}/></Grid.Column>)}
                        </Grid>
                    </Container>
                </Container>
            : 
                <Segment>
                    <Loader />
                    <Image src='/images/wireframe/short-paragraph.png' />
                </Segment>
        )
    }
}

export default Dashboard;