import React, { Component } from 'react';
import { Grid, Loader, Image, Segment, Container, Divider, Menu, Message, Label } from 'semantic-ui-react'
import UsersCard from './UsersCard'
import HomeCard from '../components/HomeCard'
import BillsCard from '../components/BillsCard'
import TasksCard from '../components/TasksCard'
import EssentialsCard from '../components/EssentialsCard'
import Outstanding from '../components/Outstanding'
import API from '../adapters/API';
import swal from '@sweetalert/with-react'

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
                API.deleteThisEssential(essential)
                swal({
                title: "Success!",
                text: "You have deleted the item!",
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
            
                return API.addNewEssential(this.props.data.home.id, name);
            }).then(API.fetchData())
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

    addNewTask = () => {
        swal(
            <div>
              <h1>Hello!</h1>        
              <p>I am a React component inside a SweetAlert modal.</p>
            </div>
          )
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

    render() {
        const { activeItem } = this.state
        let displayedCard

        switch (this.state.activeItem) {
            case 'outstanding':
                displayedCard = <Outstanding data={this.props.data}/>
                break;
            case 'bills':
                displayedCard = <BillsCard bills={this.props.data.bills} bill_splits={this.props.data.bill_splits}/>
                break;
            case 'tasks':
                displayedCard = <TasksCard tasks={this.props.data.tasks} all_tasks={this.props.data.all_tasks} user={this.props.user} users={this.props.data.users} removeTask={this.removeTask} addNewTask={this.addNewTask} updateTask={this.updateTask} addTaskToCurrentUser={this.addTaskToCurrentUser}/>
                break;
            case 'Household essentials':
                displayedCard = <EssentialsCard essentials={this.props.data.essentials} buyFromAmazon={this.buyFromAmazon} removeEssential={this.removeEssential} addNewEssential={this.addNewEssential} updateEssential={this.updateEssential}/>
                break;
            default:
                displayedCard = <Outstanding data={this.props.data}/>
        }

        return (
            this.props.data.home ? 
                <Container>   
                    <Divider />
                    <Container style={{ height: '30vh'}}>              
                        <HomeCard home={this.props.data.home} redirectToHomeProfile={this.props.redirectToHomeProfile}/>
                    </Container>
                    <Divider />
                    <Container style={{ height: '35vh'}}>
                        <Menu attached='top' tabular>
                        <Menu.Item color='teal' name='outstanding' active={activeItem === 'outstanding'} onClick={this.handleItemClick} />
                        <Menu.Item color='yellow' name='bills' active={activeItem === 'bills'} onClick={this.handleItemClick}/>
                        <Menu.Item color='olive' name='tasks' active={activeItem === 'tasks'} onClick={this.handleItemClick}/>
                        <Menu.Item color='pink' name='Household essentials' active={activeItem === 'Household essentials'} onClick={this.handleItemClick}/>
                        </Menu>
                        <div>{displayedCard}</div>
                    </Container>
                    <Divider />
                    <Container style={{ height: '30vh'}}>
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