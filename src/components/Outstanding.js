import React, { Component } from 'react';
import { Card, Table, Checkbox, Label, Grid } from 'semantic-ui-react'

class Outstanding extends Component{
    render() {

        const unpaidBillSplits = this.props.data.bill_splits.filter(bill_split => bill_split.paid === false)
        const uncompletedTasks = this.props.data.tasks.filter(task => task.completed === false)
        const neededEssentials = this.props.data.essentials.filter(essential => essential.more === false)

        return (
            <Grid textAlign='center' style={{ height: '50vh'}} verticalAlign='top'>
                <Grid.Column style={{ width: '80vw' }}>
                    <Table basic='very' celled collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>Actioned?</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Label ribbon color="yellow">Bills</Label>
                                            <Table.Row>
                                                {unpaidBillSplits.map(unpaid_bill_split => <>
                                                        {/* <img src={this.props.data.bills.find(bill => bill.id === unpaid_bill_split.bill_id).img} size='small' /> */}
                                                        <p>{this.props.data.bills.find(bill => bill.id === unpaid_bill_split.bill_id).name} ( £{unpaid_bill_split.amount} )</p>
                                                </>)}
                                            </Table.Row>
                                    <Label ribbon color="olive">Tasks</Label>
                                        <Table.Row>
                                            <div>{uncompletedTasks.map(false_task => <>
                                                {/* <img key={false_task.id} src={false_task.img} size='small' /> */}
                                                <p>{false_task.name}</p>
                                            </>
                                            )}</div>
                                        </Table.Row>
                                    <Label ribbon color="pink">Household essentials</Label>
                                        <Table.Row>
                                            <div>{neededEssentials.map(false_essentail=> <>
                                                <p>{false_essentail.name}</p>
                                            </>
                                            )}</div>
                                        </Table.Row>
                                </Table.Cell>
                                <Table.Cell>
                                    <div>{unpaidBillSplits.map(unpaid_bill_split => <p><Checkbox toggle key={unpaid_bill_split.id} slider /></p>)}</div>
                                    <div>{uncompletedTasks.map(false_task => <p><Checkbox toggle key={false_task.id} slider /></p>)}</div>
                                    <div>{neededEssentials.map(false_essentail => <p><Checkbox toggle key={false_essentail.id} slider /></p>)}</div>
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