import React from 'react';
import { Table, Header, Image, Grid, Button, Checkbox, Label} from 'semantic-ui-react'
import swal from '@sweetalert/with-react'

// const BillsCard= ({bills, bill_splits, addNewBillForm, removeBill}) => (
class BillsCard extends React.Component {

    // state = { 
    //     checked: ''
    // }
    
    // toggle = () => this.setState(prevState => ({ checked: !prevState.checked }))

    message = () => {
        swal({
            title: "Error!",
            text: "You cannot mark as complete bill shares of other users",
            icon: "info",
            button: "OK",
          });
    }

    render() {
        const user = this.props.user
        const bills = this.props.bills
        const all_bill_splits = this.props.all_bill_splits
        const user_bill_splits = this.props.bill_splits

        const other_bill_splits = this.props.all_bill_splits.filter(bill_split => bill_split.user_id !== user.id)
        const userBills = user_bill_splits.map(bill_split => bills.filter(bill => bill_split.bill_id === bill.id)[0])
        const otherBills = all_bill_splits.map(bill_split => bills.filter(bill => bill_split.bill_id !== bill.id))[0]

        const addNewBillForm = this.props.addNewBillForm
        const removeBill = this.props.removeBill
        const updateBillSplit = this.props.updateBillSplit
        const addOtherBillsToCurrentUser = this.props.addOtherBillsToCurrentUser

        console.log(userBills, otherBills)
        return (
            <div>
            { otherBills === undefined ?
                <Grid textAlign='center' verticalAlign='top'>
                    <Grid.Column style={{ width: '80vw' }}>
                        <Table basic='very' celled collapsing>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>Household total</Table.HeaderCell>
                                    <Table.HeaderCell>Your share</Table.HeaderCell>
                                    <Table.HeaderCell>Paid?</Table.HeaderCell>
                                    <Table.HeaderCell>Due day</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                            <Label ribbon color="yellow">Your bills</Label>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>
                                                {/* {bills.map(bill => <Image src={bill.img} size='small' />)} */}
                                                {userBills.map(userBill => <p>{userBill.name}</p>)}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {userBills.map(userBill => <p>£{userBill.total}</p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user_bill_splits.map(bill_split => <p>£{bill_split.amount}</p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user_bill_splits.map(bill_split => <p><Checkbox toggle 
                                        // onChange={this.toggle} 
                                        checked={bill_split.paid} onChange={() => updateBillSplit(bill_split, this.props.user)}/></p>)}     
                                    </Table.Cell>
                                    <Table.Cell>
                                        {userBills.map(bill => <p>{bill.date_due}</p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {userBills.map(bill => <Button color='red' fluid size='small' onClick={(e) => removeBill(e, bill)}>Remove</Button>)} 
                                    </Table.Cell>
                                </Table.Row>
                            <Label ribbon color="yellow">All other bills</Label>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>
                                                {/* {all_tasks.map(task => <Image src={task.img} size='small' />)} */}
                                                {/* {otherBills.map(otherBill => <p>{otherBill.name}</p>)} */}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {/* {otherBills.map(otherBill => <p>£{otherBill.total}</p>)} */}
                                    </Table.Cell>
                                    <Table.Cell>

                                    </Table.Cell>
                                    <Table.Cell>
                                        {/* {other_bill_splits.map(other_bill_split => <p><Checkbox toggle onChange={this.message} checked={other_bill_split.paid}/></p>)}  */}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {/* {otherBills.map(otherBill => <p>{otherBill.date_due}</p>)} */}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {/* {otherBills.map(otherBill => <Button color='yellow' fluid size='small' onClick={(e) => addOtherBillsToCurrentUser(otherBill, this.props.user)}>Take part</Button>)}  */}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Button color='yellow' size='medium' onClick={() => addNewBillForm()} >Add more bills</Button>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            :
                <Grid textAlign='center' verticalAlign='top'>
                    <Grid.Column style={{ width: '80vw' }}>
                        <Table basic='very' celled collapsing>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>Household total</Table.HeaderCell>
                                    <Table.HeaderCell>Your share</Table.HeaderCell>
                                    <Table.HeaderCell>Paid?</Table.HeaderCell>
                                    <Table.HeaderCell>Due day</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                            <Label ribbon color="yellow">Your bills</Label>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>
                                                {/* {bills.map(bill => <Image src={bill.img} size='small' />)} */}
                                                {userBills.map(userBill => <p>{userBill.name}</p>)}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {userBills.map(userBill => <p>£{userBill.total}</p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user_bill_splits.map(bill_split => <p>£{bill_split.amount}</p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {user_bill_splits.map(bill_split => <p><Checkbox toggle 
                                        // onChange={this.toggle} 
                                        checked={bill_split.paid} onChange={() => updateBillSplit(bill_split, this.props.user)}/></p>)}     
                                    </Table.Cell>
                                    <Table.Cell>
                                        {userBills.map(bill => <p>{bill.date_due}</p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {userBills.map(bill => <Button color='red' fluid size='small' onClick={(e) => removeBill(e, bill)}>Remove</Button>)} 
                                    </Table.Cell>
                                </Table.Row>
                            <Label ribbon color="yellow">All other bills</Label>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h4'>
                                            <Header.Content>
                                                {/* {all_tasks.map(task => <Image src={task.img} size='small' />)} */}
                                                {otherBills.map(otherBill => <p>{otherBill.name}</p>)}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {otherBills.map(otherBill => <p>£{otherBill.total}</p>)}
                                    </Table.Cell>
                                    <Table.Cell>

                                    </Table.Cell>
                                    <Table.Cell>
                                        {other_bill_splits.map(other_bill_split => <p><Checkbox toggle onChange={this.message} checked={other_bill_split.paid}/></p>)} 
                                    </Table.Cell>
                                    <Table.Cell>
                                        {otherBills.map(otherBill => <p>{otherBill.date_due}</p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {otherBills.map(otherBill => <Button color='yellow' fluid size='small' onClick={(e) => addOtherBillsToCurrentUser(otherBill, this.props.user)}>Take part</Button>)} 
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Button color='yellow' size='medium' onClick={() => addNewBillForm()} >Add more bills</Button>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            }
                </div> 
    )
}
}

export default BillsCard;