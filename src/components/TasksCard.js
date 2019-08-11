import React from 'react';
import { Grid, Table, Header, Image, Checkbox, Button, Label} from 'semantic-ui-react'
import swal from '@sweetalert/with-react'

class TasksCard extends React.Component {

    state = { 
        checked: ''
    }
    
    toggle = () => this.setState(prevState => ({ checked: !prevState.checked }))

    message = () => {
        swal({
            title: "Error!",
            text: "You cannot complete taks that are not assigned to you",
            icon: "info",
            button: "OK",
          });
    }

    render() {
        const tasks = this.props.tasks
        const all_tasks = this.props.all_tasks
        const otherTasks = all_tasks.filter(task => task.user_id !== this.props.user.id)
        const addNewTask = this.props.addNewTask
        const updateTask = this.props.updateTask
        const removeTask = this.props.removeTask

        return (
            <Grid textAlign='center' style={{ height: '50vh'}} verticalAlign='top'>
                <Grid.Column style={{ width: '80vw' }}>
                    <Table basic='very' celled collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>Description</Table.HeaderCell>
                                <Table.HeaderCell>Completed?</Table.HeaderCell>
                                <Table.HeaderCell>By</Table.HeaderCell>
                                <Table.HeaderCell>Due day</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        <Label ribbon color="olive">Your taks</Label>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h4'>
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
                                    {tasks.map(task => <p><Checkbox toggle onChange={this.toggle} checked={task.completed} onChange={() => updateTask(task, this.props.user)}/></p>)}           
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
                                    <Header as='h4'>
                                        <Header.Content>
                                            {/* {all_tasks.map(task => <Image src={task.img} size='small' />)} */}
                                            {otherTasks.map(task => <p>{task.name}</p>)}
                                            <Button color='olive' size='medium' onClick={() => addNewTask()} >Add more tasks</Button>
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
                                    {otherTasks.map(task => <p>{this.props.users.find(user => user.id === task.id).first_name}</p>)} 
                                </Table.Cell>
                                <Table.Cell>
                                    {otherTasks.map(task => <p>{task.day}</p>)}
                                </Table.Cell>
                                <Table.Cell>
                                    {otherTasks.map(task => <Button color='yellow' fluid size='small' onClick={(e) => this.props.addTaskToCurrentUser(task, this.props.user)}>Assign to yourself</Button>)} 
                                </Table.Cell>
                            </Table.Row>
                            
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid>
        )
    }
}

export default TasksCard;