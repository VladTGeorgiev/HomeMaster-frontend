import React from 'react';
import { Grid, Table, Header, Checkbox, Button, Label, Divider, Icon } from 'semantic-ui-react'
import swal from '@sweetalert/with-react'

class TasksCard extends React.Component {

    message = () => {
        const text = ["You cannot complete tasks", "that are not assigned to you"]
        swal({
            title: "Error!",
            text: text.join('\n'),
            icon: "info",
            button: "OK",
          });
    }

    userTaskDetails = (task) => {
        const description = `Description: ${task.description}`
        const user = `Who's responsible: ${this.props.user.first_name}`
        const day = `When: ${task.day}`
        const text = [description, user, day]
        swal({
            title: "Details",
            text: text.join('\n\n'),
            icon: "info",
            button: false,
          });
    }

    otherUsersTaskDetails = (task) => {
        const users = this.props.users
        const taskUser = users.find(user => user.id === task.user_id).first_name
        const description = `Description: ${task.description}`
        const user = `Who's responsible: ${taskUser}`
        const day = `When: ${task.day}`
        const text = [description, user, day]
        swal({
            title: "Details",
            text: text.join('\n\n'),
            icon: "info",
            button: false,
          });
    }

    render() {
        const tasks = this.props.tasks
        const otherTasks = this.props.all_tasks.filter(task => task.user_id !== this.props.user.id)
        const updateTask = this.props.updateTask
        const removeTask = this.props.removeTask
        const users = this.props.users

        const width = this.props.width;
        const isMobile = width < 550;

        if (isMobile) {
            return (
                <Grid textAlign='center' verticalAlign='top'>
                    <Grid.Column style={{ width: '90vw' }}>
                    <Divider hidden fitted/>
                    <Divider hidden fitted/>
                    <Divider hidden fitted/>
                    <Divider hidden fitted/>   
                        <Table.Body>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>Completed?</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>You could also...</Table.HeaderCell>
                                </Table.Row>

                            <Label ribbon color="olive">Your taks</Label>
                            <Divider hidden fitted/>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h5'>
                                            <Header.Content>
                                                {/* {tasks.map(task => <Image src={task.img} size='small' />)} */}
                                                {tasks.map(task => <p onClick={()=>this.userTaskDetails(task)}>{task.name}<Icon name='info'/></p>)}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {tasks.map(task => <p><Checkbox toggle checked={task.completed} onChange={() => updateTask(task, this.props.user)}/></p>)}           
                                    </Table.Cell>
                                    <Table.Cell>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {tasks.map(task => <Button color='red' fluid size='small' onClick={(e) => removeTask(e, task)}>Remove</Button>)} 
                                    </Table.Cell>
                                </Table.Row>
                                <Divider hidden fitted/>
                                <Divider hidden fitted/>
                                <Divider hidden fitted/>

                            <Label ribbon color="olive">All other tasks</Label>
                            <Divider hidden fitted/>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h5'>
                                            <Header.Content>
                                                {/* {all_tasks.map(task => <Image src={task.img} size='small' />)} */}
                                                {otherTasks.map(task => <p onClick={()=>this.otherUsersTaskDetails(task)}>{task.name}<Icon name='info' /></p>)}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {otherTasks.map(task => <p><Checkbox toggle onChange={this.message} checked={task.completed}/></p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {otherTasks.map(task => <Button color='yellow' fluid size='small' onClick={(e) => this.props.addTaskToCurrentUser(task, this.props.user)}><div className='comfortaa'>Volunteer</div></Button>)} 
                                    </Table.Cell>
                                </Table.Row>
                                <Divider hidden/>
                                <Divider hidden fitted/>
                                <Divider hidden fitted/>
                                <Divider hidden fitted/>
                            </Table.Body>
                            <Button color='olive' size='medium' onClick={() => this.props.addNewTaskForm()} ><div className='comfortaa'>Add more tasks</div></Button>
                    </Grid.Column>
                </Grid>
            )
        } else {
            return (
                <Grid textAlign='center' verticalAlign='top'>
                    <Divider hidden/>
                    <Grid.Column style={{ width: '80vw' }}>
                        <Table basic='very' celled collapsing>
                        <Divider hidden/>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>Description</Table.HeaderCell>
                                    <Table.HeaderCell>Completed?</Table.HeaderCell>
                                    <Table.HeaderCell>Who's responsible</Table.HeaderCell>
                                    <Table.HeaderCell>When</Table.HeaderCell>
                                    <Table.HeaderCell>You could also...</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
    
                            <Table.Body>
                            <Label ribbon color="olive">Your taks</Label>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h5'>
                                            <Header.Content>
                                                {/* {tasks.map(task => <Image src={task.img} size='small' />)} */}
                                                {tasks.map(task => <p>{task.name}</p>)}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {tasks.map(task => <p>{task.description}</p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {tasks.map(task => <p><Checkbox toggle checked={task.completed} onChange={() => updateTask(task, this.props.user)}/></p>)}           
                                    </Table.Cell>
                                    <Table.Cell>
                                        {tasks.map(task => <p>{this.props.user.first_name}</p>)} 
                                    </Table.Cell>
                                    <Table.Cell>
                                        {tasks.map(task => <p>{task.day}</p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {tasks.map(task => <Button color='red' fluid size='small' onClick={(e) => removeTask(e, task)}>Remove</Button>)} 
                                    </Table.Cell>
                                </Table.Row>
                            <Label ribbon color="olive">All other tasks</Label>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h5'>
                                            <Header.Content>
                                                {/* {all_tasks.map(task => <Image src={task.img} size='small' />)} */}
                                                {otherTasks.map(task => <p>{task.name}</p>)}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {otherTasks.map(task => <p>{task.description}</p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {otherTasks.map(task => <p><Checkbox toggle onChange={this.message} checked={task.completed}/></p>)} 
                                    </Table.Cell>
                                    <Table.Cell>
                                        {otherTasks.map(task => <p>{users.find(user => user.id === task.user_id).first_name}</p>)} 
                                    </Table.Cell>
                                    <Table.Cell>
                                        {otherTasks.map(task => <p>{task.day}</p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {otherTasks.map(task => <Button color='yellow' fluid size='small' onClick={(e) => this.props.addTaskToCurrentUser(task, this.props.user)}><div className='comfortaa'>Assign to yourself</div></Button>)} 
                                    </Table.Cell>
                                </Table.Row>
                                <Divider hidden/>
                                <Table.Row>
                                    <Button color='olive' size='medium' onClick={() => this.props.addNewTaskForm()} ><div className='comfortaa'>Add more tasks</div></Button>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            )
        }
    }
}

export default TasksCard;