import React, { Component } from 'react';
import { Grid, Loader, Image, Segment, Container, Divider, Menu, Label } from 'semantic-ui-react'
import UsersCard from './UsersCard'
import HomeCard from '../components/HomeCard'
import BillsCard from '../components/BillsCard'
import TasksCard from '../components/TasksCard'
import EssentialsCard from '../components/EssentialsCard'
import Outstanding from '../components/Outstanding'
import BillsCardOld from '../components/BillsCardOld'
import swal from '@sweetalert/with-react'
import NewTask from '../components/NewTask'
import NewBill from '../components/NewBill'
import { thisExpression } from '@babel/types';
import essentialsicon from '../media/check.png'

class Dashboard extends Component {
    state = { 
        activeItem: 'outstanding' 
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

// ESSENTIALS

    buyFromAmazon = (e, name) => {
    window.open(
        'https://www.amazon.co.uk/s?k='+name, '_blank'
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
                // icon: essentialsicon
            })
            .then(name => {
                if (!name) throw null;
                return this.props.addNewEssential(this.props.data.home.id, name);
            })
            // .then(this.props.fetchData())
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

    render() {
        const { activeItem } = this.state
        let displayedCard

        switch (this.state.activeItem) {
            case 'outstanding':
                displayedCard = <Outstanding user={this.props.user} data={this.props.data} updateTask={this.props.updateTask} updateBillSplit={this.props.updateBillSplit} updateEssential={this.props.updateEssential}/>
                break;
            case 'bills':
                displayedCard = <BillsCardOld user={this.props.user} bills={this.props.data.bills} bill_splits={this.props.data.bill_splits} all_bill_splits={this.props.data.all_bill_splits} removeBill={this.props.removeBill} addNewBillForm={this.addNewBillForm} updateBillSplit={this.props.updateBillSplit} addOtherBillsToCurrentUser={this.props.addOtherBillsToCurrentUser}
                />
                break;
            case 'tasks':
                displayedCard = <TasksCard tasks={this.props.data.tasks} all_tasks={this.props.data.all_tasks} user={this.props.user} users={this.props.data.users} home={this.props.data.home} removeTask={this.removeTask} addNewTaskForm={this.addNewTaskForm} updateTask={this.props.updateTask} addTaskToCurrentUser={this.props.addTaskToCurrentUser}/>
                break;
            case 'Household essentials':
                displayedCard = <EssentialsCard essentials={this.props.data.essentials} buyFromAmazon={this.buyFromAmazon} removeEssential={this.removeEssential} addNewEssential={this.addNewEssential} updateEssential={this.props.updateEssential}/>
                break;
            default:
                displayedCard = <Outstanding/>
        }

        return (
            this.props.data.home ? 
                <Container>   
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
                        <Menu.Item color='pink' name='Household essentials' active={activeItem === 'Household essentials'} onClick={this.handleItemClick}/>
                        </Menu>
                        <div>{displayedCard}</div>
                    </Container>
                    <Divider />
                    <Divider hidden/>
                    <Container >
                        <Label ribbon color="teal" size="large">Your housemates</Label>
                        <Divider hidden/>
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