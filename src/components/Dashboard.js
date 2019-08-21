import React, { Component } from 'react';
import { Grid, Loader, Image, Segment, Container, Divider, Menu, Label } from 'semantic-ui-react'
import UsersCard from './UsersCard'
import UsersCardMobile from './UsersCardMobile'
import UsersCardMobileBack from './UsersCardMobileBack'
import HomeCard from '../components/HomeCard'
import BillsCard from '../components/BillsCard'
import TasksCard from '../components/TasksCard'
import EssentialsCard from '../components/EssentialsCard'
import Outstanding from '../components/Outstanding'
import swal from '@sweetalert/with-react'
import NewTask from '../components/NewTask'
import NewBill from '../components/NewBill'
import API from '../adapters/API'
import essentialsIcon from '../media/check-purple.png'
import oustandingIcon from '../media/hourglass.png'
import taskIcon from '../media/construction.png'
import billIcon from '../media/credit-card-yellow.png'

class Dashboard extends Component {
    state = { 
        activeItem: 'outstanding',
        front: true
    }

    showDetails = () => {
        this.setState({front: !this.state.front})
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

// ESSENTIALS

    buyFromAmazon = (e, name) => {
    window.open(
        API.buyFromAmazon+name, '_blank'
      );
    }

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
            })
            .then(name => {
                if (!name) throw null;
                return this.props.addNewEssential(this.props.data.home.id, name);
            })
    }

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
                this.props.deleteTask(task)
                swal({
                title: "Success!",
                text: "You have deleted the task!",
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

    addNewTaskForm = () => {
          swal({
            buttons: {
            },
            content: (
              <div>
                <NewTask user={this.props.user} home={this.props.data.home} addNewTask={this.props.addNewTask}/>
                </div>
            )
          })
    }

    
// BILLS
    addNewBillForm = () => {
        swal({
          buttons: {
          },
          content: (
            <div>
              <NewBill user={this.props.user} home={this.props.data.home} addNewBill={this.props.addNewBill}/>
              </div>
          )
        })
  }

    updateBillSplitState = (old_bill_split, user) => {
    let bill_split = {
        id: old_bill_split.id,
        paid: !old_bill_split.paid
    }
    this.props.updateBillSplit(bill_split, user)
}

    render() {
        
        const width = this.props.width;
        const isMobile = width < 770;
        const { activeItem } = this.state
        let displayedCard
        let users = this.props.data.users
        
        let displayCardUser
        if (users === undefined) {
        } else {
        this.state.front ? displayCardUser = <Grid columns={2}>
            {users.filter(user => user.id !== this.props.user.id).map(user => <Grid.Column key={user.id}><UsersCardMobile user={user} showDetails={this.showDetails}/></Grid.Column>)}        
        </Grid>
        : displayCardUser = <Grid columns={1}>
            {users.filter(user => user.id !== this.props.user.id).map(user => <Grid.Column key={user.id}><UsersCardMobileBack user={user} showDetails={this.showDetails}/></Grid.Column>)}        
        </Grid>
        }


        if (isMobile) {
            switch (this.state.activeItem) {
                case 'outstanding':
                    displayedCard = <div>
                        <Divider hidden fitted/>
                        <Divider hidden fitted/>
                        <Divider hidden fitted/>
                        <Label className="mobile-dashboard-menu-item" color='teal' horizontal>Outstanding</Label>
                        <Outstanding user={this.props.user} data={this.props.data} bills={this.props.data.bills} updateTask={this.props.updateTask} width={this.props.width} updateBillSplit={this.updateBillSplitState} updateEssential={this.props.updateEssential}/>
                        </div> 
                    break;
                case 'bills':
                    displayedCard = <div>
                        <Divider hidden fitted/>
                        <Divider hidden fitted/>
                        <Divider hidden fitted/>
                        <Label className="mobile-dashboard-menu-item" color='yellow' horizontal>Bills</Label>
                        <BillsCard user={this.props.user} width={this.props.width} bills={this.props.data.bills} bill_splits={this.props.data.bill_splits} all_bill_splits={this.props.data.all_bill_splits} removeBill={this.props.removeBill} addNewBillForm={this.addNewBillForm} updateBillSplit={this.updateBillSplitState} addOtherBillsToCurrentUser={this.props.addOtherBillsToCurrentUser}
                        /> 
                    </div> 
                    break;
                case 'tasks':
                    displayedCard = <div>
                        <Divider hidden fitted/>
                        <Divider hidden fitted/>
                        <Divider hidden fitted/>
                        <Label className="mobile-dashboard-menu-item" color='olive' horizontal>Tasks</Label>
                        <TasksCard tasks={this.props.data.tasks} all_tasks={this.props.data.all_tasks} user={this.props.user} width={this.props.width} users={this.props.data.users} home={this.props.data.home} removeTask={this.removeTask} addNewTaskForm={this.addNewTaskForm} updateTask={this.props.updateTask} addTaskToCurrentUser={this.props.addTaskToCurrentUser}/>
                    </div> 
                    break;
                case 'household essentials':
                    displayedCard = <div>
                    <Divider hidden fitted/>
                    <Divider hidden fitted/>
                    <Divider hidden fitted/>
                    <Label className="mobile-dashboard-menu-item" color='pink' horizontal>Household essentials</Label>
                    <EssentialsCard essentials={this.props.data.essentials} buyFromAmazon={this.buyFromAmazon} removeEssential={this.removeEssential} width={this.props.width} addNewEssential={this.addNewEssential} updateEssential={this.props.updateEssential}/>
                    </div> 
                    break;
                default:
                    displayedCard = <Outstanding/>
            }
        } else {
        switch (this.state.activeItem) {
            case 'outstanding':
                displayedCard = <Outstanding user={this.props.user} data={this.props.data} bills={this.props.data.bills} width={this.props.width} updateTask={this.props.updateTask} updateBillSplit={this.updateBillSplitState} updateEssential={this.props.updateEssential}/>
                break;
            case 'bills':
                displayedCard = <BillsCard user={this.props.user} bills={this.props.data.bills} bill_splits={this.props.data.bill_splits} width={this.props.width} all_bill_splits={this.props.data.all_bill_splits} removeBill={this.props.removeBill} addNewBillForm={this.addNewBillForm} updateBillSplit={this.updateBillSplitState} addOtherBillsToCurrentUser={this.props.addOtherBillsToCurrentUser}
                />
                break;
            case 'tasks':
                displayedCard = <TasksCard tasks={this.props.data.tasks} all_tasks={this.props.data.all_tasks} user={this.props.user} users={this.props.data.users} width={this.props.width} home={this.props.data.home} removeTask={this.removeTask} addNewTaskForm={this.addNewTaskForm} updateTask={this.props.updateTask} addTaskToCurrentUser={this.props.addTaskToCurrentUser}/>
                break;
            case 'household essentials':
                displayedCard = <EssentialsCard essentials={this.props.data.essentials} buyFromAmazon={this.buyFromAmazon} width={this.props.width} removeEssential={this.removeEssential} addNewEssential={this.addNewEssential} updateEssential={this.props.updateEssential}/>
                break;
            default:
                displayedCard = <Outstanding/>
        }
    }
    
        if (isMobile) {
            return (
                this.props.data.home ? 
                    <Container >   
                        <Container >
                            <Menu attached='top' tabular>
                            <Menu.Item color='teal' name='outstanding' active={activeItem === 'outstanding'} onClick={this.handleItemClick} ><img src={oustandingIcon} alt='outstanding'/></Menu.Item>
                            <Menu.Item color='yellow' name='bills' active={activeItem === 'bills'} onClick={this.handleItemClick}><img src={billIcon} alt='bills'/></Menu.Item>
                            <Menu.Item color='olive' name='tasks' active={activeItem === 'tasks'} onClick={this.handleItemClick}><img src={taskIcon} alt='tasks'/></Menu.Item>
                            <Menu.Item color='pink' name='household essentials' active={activeItem === 'household essentials'} onClick={this.handleItemClick}><img src={essentialsIcon} alt='household essentials'/></Menu.Item>
                            </Menu>
                            <div>{displayedCard}</div>
                        </Container>
                        <Divider />
                        <Container>
                        <Label ribbon color="teal" size="large">Your home</Label>
                        <Divider hidden/>           
                            <HomeCard home={this.props.data.home} redirectToHomeProfile={this.props.redirectToHomeProfile}/>
                        </Container>
                        <Divider />
                        <Container >
                            {this.props.data.users.length - 1 === 1 ? 
                                <Label ribbon color="teal" size="large">There is one other person living with you</Label>
                            :
                                <Label ribbon color="teal" size="large">There are {this.props.data.users.length-1} other people living with you</Label>
                            }
                            <Divider hidden/>
                            <div>{displayCardUser}</div>
                        </Container>
                    </Container>
                : 
                    <Segment>
                        <Loader />
                        <Image src='/images/wireframe/short-paragraph.png' />
                    </Segment>
            )
        } else {
            return (
                this.props.data.home ? 
                    <Container >   
                        <Container>              
                            <HomeCard home={this.props.data.home} redirectToHomeProfile={this.props.redirectToHomeProfile}/>
                        </Container>
                        <Divider hidden/>
                        <Divider hidden/>
                        <Container >
                            <Menu attached='top' tabular>
                            <Menu.Item color='teal' name='outstanding' active={activeItem === 'outstanding'} onClick={this.handleItemClick} />
                            <Menu.Item color='yellow' name='bills' active={activeItem === 'bills'} onClick={this.handleItemClick}/>
                            <Menu.Item color='olive' name='tasks' active={activeItem === 'tasks'} onClick={this.handleItemClick}/>
                            <Menu.Item color='pink' name='household essentials' active={activeItem === 'household essentials'} onClick={this.handleItemClick}/>
                            </Menu>
                            <div>{displayedCard}</div>
                        </Container>
                        <Divider />
                        <Divider hidden/>
                        <Container >
                            {this.props.data.users.length - 1 === 1 ? 
                                <Label ribbon color="teal" size="large">There is one other person living with you</Label>
                            :
                                <Label ribbon color="teal" size="large">There are {this.props.data.users.length-1} other people living with you</Label>
                            }
                            <Divider hidden/>
                            <Grid columns={4}>
                                {this.props.data.users.filter(user => user.id !== this.props.user.id).map(user => <Grid.Column key={user.id} mobile={16} tablet={8} computer={4}><UsersCard  user={user}/></Grid.Column>)}
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
}

export default Dashboard;