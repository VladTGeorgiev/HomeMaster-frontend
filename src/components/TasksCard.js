import React from 'react';
import { Grid, Table, Header, Image, Checkbox, Button, Label, Divider } from 'semantic-ui-react'
import swal from '@sweetalert/with-react'

class TasksCard extends React.Component {

    // state = { 
    // }
    
    // toggle = (taskId) => this.setState(prevState => ({ [taskId]: !prevState[taskId] }))

    message = () => {
        swal({
            title: "Error!",
            text: "You cannot complete tasks that are not assigned to you",
            icon: "info",
            button: "OK",
          });
    }

    render() {
        const tasks = this.props.tasks
        const otherTasks = this.props.all_tasks.filter(task => task.user_id !== this.props.user.id)
        const updateTask = this.props.updateTask
        const removeTask = this.props.removeTask
        const users = this.props.users

        return (
            <Grid textAlign='center' verticalAlign='top'>
                <Divider hidden/>
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
                                    <Header as='h4'>
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

export default TasksCard;