import React from 'react';
import { Table, Header, Image, Grid, Button, Checkbox, Label} from 'semantic-ui-react'
import swal from '@sweetalert/with-react'

// const BillsCard= ({bills, bill_splits, addNewBillForm, removeBill}) => (
class BillsCard extends React.Component {

    message = () => {
        swal({
            title: "Error!",
            text: "You cannot complete otherBillss that are not assigned to you",
            icon: "info",
            button: "OK",
          });
    }

    render() {
        const user = this.props.user
        const bills = this.props.bills
        const bill_splits = this.props.bill_splits
        const user_bill_splits = bill_splits.filter(bill_split => bill_split.user_id === user.id)
        const other_bill_splits = this.props.all_bill_splits.filter(bill_split => bill_split.user_id !== user.id)
        const userBills = bill_splits.map(bill_split => bills.filter(bill => bill_split.bill_id === bill.id)[0])
        const otherBills = bill_splits.map(bill_split => bills.filter(bill => bill_split.bill_id !== bill.id))
        const addNewBillForm = this.props.addNewBillForm
        const removeBill = this.props.removeBill
        const updateBillSplit = this.props.updateBillSplit
        return (
            <>
    <Grid textAlign='center' verticalAlign='top'>
        <Grid.Column style={{ width: '80vw' }}>
            <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Paid?</Table.HeaderCell>
                        <Table.HeaderCell>Due date</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>
                                <Header.Content>
                                    {userBills.map(bill => <>
                                    {/* <Image src={bill.img} size='small' /> */}
                                    <p>{bill.name}</p>
                                    </>
                                    )}
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>
                            {bill_splits.map(bill_split => <p>£{bill_split.amount}</p>)}
                        </Table.Cell>
                        <Table.Cell>
                            {bill_splits.map(bill_split => <p><Checkbox toggle checked={bill_split.paid} onChange={() => updateBillSplit(bill_split, this.props.user)}/></p>)} 
                        </Table.Cell>
                        <Table.Cell>
                            {userBills.map(bill => <p>{bill.date_due}</p>)}
                        </Table.Cell>
                        <Table.Cell>
                            {userBills.map(bill => <Button color='red' fluid size='small' onClick={(e) => removeBill(e, bill)}>Remove</Button>)} 
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Button color='yellow' size='medium' onClick={() => addNewBillForm()} >Add more bills</Button>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Grid.Column>
    </Grid>
</>
    )
}
}
export default BillsCard;