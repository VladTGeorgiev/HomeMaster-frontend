import React from 'react';
import { Card, Table, Header} from 'semantic-ui-react'

const TasksCard= ({tasks}) => (
    <Card>
        <Card.Header as='h2'>Tasks</Card.Header>
        <Table basic='very' celled collapsing>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Due date</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4'>
                            <Header.Content>
                                {tasks.map(task => <p>{task.name}</p>)}
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>
                        {tasks.map(task => <p>{task.description}</p>)}
                    </Table.Cell>
                    <Table.Cell>
                        {tasks.map(task => <p>{task.date_due}</p>)}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </Card>
)

export default TasksCard;