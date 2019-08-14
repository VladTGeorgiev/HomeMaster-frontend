import React, { Component } from 'react';
import { Card, Table, Checkbox, Label, Grid, Divider, Header } from 'semantic-ui-react'

class Outstanding extends Component{

    render() {

        const unpaidBillSplits = this.props.data.bill_splits.filter(bill_split => bill_split.paid === false)
        const uncompletedTasks = this.props.data.tasks.filter(task => task.completed === false)
        const neededEssentials = this.props.data.essentials.filter(essential => essential.more == true)
        const updateTask = this.props.updateTask
        const updateBillSplit = this.props.updateBillSplit
        const updateEssential = this.props.updateEssential

        const bills = this.props.bills
        const userBills = unpaidBillSplits.map(bill_split => bills.filter(bill => bill_split.bill_id === bill.id)[0])

        return (
            <Grid textAlign='center' verticalAlign='top'>
                <Divider hidden/>
                <Grid.Column style={{ width: '80vw' }}>
                    <Table basic='very' celled collapsing>
                    <Divider hidden/>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>Amount</Table.HeaderCell>
                                <Table.HeaderCell>When</Table.HeaderCell>
                                <Table.HeaderCell>Complete</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        <Label ribbon color="yellow">Bills</Label>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h5'>
                                        <Header.Content>
                                            {userBills.map(bill => <p>{bill.name}</p>)}
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                    {unpaidBillSplits.map(unpaid_bill_split => <p> £ {unpaid_bill_split.amount} </p>)}
                                </Table.Cell>
                                <Table.Cell>
                                    {userBills.map(bill => <p>{bill.date_due}</p>)}
                                </Table.Cell>
                                <Table.Cell>
                                    <div>{unpaidBillSplits.map(unpaid_bill_split => <p><Checkbox toggle checked={unpaid_bill_split.paid} onChange={() => updateBillSplit(unpaid_bill_split, this.props.user)} /></p>)}</div>
                                </Table.Cell>
                            </Table.Row>
                            
                            
                        <Label ribbon color="olive">Tasks</Label>
                            <Table.Row>
                                <Table.Cell>
                                    <Header as='h5'>
                                        <Header.Content>
                                        <div>{uncompletedTasks.map(false_task => <>
                                                    <p>{false_task.name}</p>
                                                </>
                                            )}</div>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                </Table.Cell>
                                <Table.Cell>
                                    {uncompletedTasks.map(task => <p>{task.day}</p>)}
                                </Table.Cell>
                                <Table.Cell>
                                    <div>{uncompletedTasks.map(false_task => <p><Checkbox toggle checked={false_task.completed} onChange={() => updateTask(false_task, this.props.user)} /></p>)}</div>
                                </Table.Cell>
                            </Table.Row>


                        <Label ribbon color="pink">Household essentials</Label>
                        <Table.Row>
                                <Table.Cell>
                                    <Header as='h5'>
                                        <Header.Content>
                                        <div>{neededEssentials.map(false_essentail=> <>
                                                    <p>{false_essentail.name}</p>
                                                </>
                                            )}</div>
                                        </Header.Content>
                                    </Header>
                                </Table.Cell>
                                <Table.Cell>
                                </Table.Cell>
                                <Table.Cell>
                                </Table.Cell>
                                <Table.Cell>
                                    <div>{neededEssentials.map(false_essentail => <p><Checkbox toggle checked={!false_essentail.more} onChange={() => updateEssential(false_essentail, this.props.user)} /></p>)}</div>
                                </Table.Cell>
                            </Table.Row>


                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Outstanding