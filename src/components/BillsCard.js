import React from 'react';
import { Table, Header, Grid, Button, Checkbox, Label, Divider, Icon } from 'semantic-ui-react'
import swal from '@sweetalert/with-react'

class BillsCard extends React.Component {

    message = () => {
        swal({
            title: "Error!",
            text: "You cannot mark other users' bills as paid",
            icon: "info",
            button: "OK",
          });
    }

    userBillDetails = (bill) => {
        const splits = this.props.bill_splits
        const bills = this.props.bills
        const total = `Household total: ${bill.total}`
        const provider = `Provider: ${bill.provider}`
        const day = `Due by: ${bill.date_due}`
        const billShare = splits.find(split=> bills.map(bill => split.bill_id === bill.id)).amount
        const share = `Your share: ${billShare}`
        const text = [share, provider, total, day]
        swal({
            title: "Details",
            text: text.join('\n\n'),
            icon: "info",
            button: false,
          });
    }

    otherUsersBillDetails = (bill) => {
        const total = `Household total: ${bill.total}`
        const provider = `Provider: ${bill.provider}`
        const day = `Due by: ${bill.date_due}`
        const text = [total, provider, day]
        swal({
            title: "Details",
            text: text.join('\n\n'),
            icon: "info",
            button: false,
          });
    }

    render() {
        const user = this.props.user
        const bills = this.props.bills

        const all_bill_splits = this.props.all_bill_splits


        const user_bill_splits = this.props.bill_splits
        const userBills = user_bill_splits.map(bill_split => bills.filter(bill => bill_split.bill_id === bill.id)[0])

        const other_bill_splits_all = all_bill_splits.filter(bill_split => bill_split.user_id !== user.id)

        const other_bill_splits = other_bill_splits_all.filter(obs => !user_bill_splits.map(ubs => ubs.bill_id).includes(obs.bill_id))

        const otherBillsAll = other_bill_splits.map(bill_split => bills.filter(bill => bill_split.bill_id === bill.id)[0])

        const otherBills = otherBillsAll.filter(oB => !userBills.map(uB => uB.id).includes(oB.id))

        

        const addNewBillForm = this.props.addNewBillForm
        const removeBill = this.props.removeBill
        const updateBillSplit = this.props.updateBillSplit
        const addOtherBillsToCurrentUser = this.props.addOtherBillsToCurrentUser

        const width = this.props.width;
        const isMobile = width < 770;

        if (isMobile) {
            return (
                <div>
                { otherBills === undefined ?
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
                                        <Table.HeaderCell>Paid?</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                        <Table.HeaderCell>You could also...</Table.HeaderCell>
                                    </Table.Row>
    
                                <Label ribbon color="yellow">Your bills</Label>
                                <Divider hidden fitted/>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h5'>
                                                <Header.Content>
                                                    {/* {bills.map(bill => <Image src={bill.img} size='small' />)} */}
                                                    {userBills.map(userBill => <p onClick={()=>this.userBillDetails(userBill)}>{userBill.name}<Icon name='info'/></p>)}
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {user_bill_splits.map(bill_split => <p><Checkbox toggle 
                                            checked={bill_split.paid} onChange={() => updateBillSplit(bill_split, this.props.user)}/></p>)}
                                        </Table.Cell>
                                        <Table.Cell>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {userBills.map(bill => <Button color='red' fluid size='small' onClick={(e) => removeBill(e, bill)}>Remove</Button>)} 
                                        </Table.Cell>
                                    </Table.Row>
                                    <Divider hidden fitted/>
                                    <Divider hidden fitted/>
                                    <Divider hidden fitted/>

                                <Label ribbon color="yellow">All other bills</Label>
                                <Divider hidden fitted/>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h5'>
                                                <Header.Content>
                                                    {/* {all_tasks.map(task => <Image src={task.img} size='small' />)} */}
                                                    {/* {otherBills.map(otherBill => <p onClick={()=>this.otherUsersBillDetails(otherBill)}>{otherBill.name}<Icon name='info'/></p>)} */}
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {/* {other_bill_splits.map(other_bill_split => <p><Checkbox toggle onChange={this.message} checked={other_bill_split.paid}/></p>)} */}
                                        </Table.Cell>
                                        <Table.Cell>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {/* {otherBills.map(otherBill => <Button color='yellow' fluid size='small' onClick={(e) => addOtherBillsToCurrentUser(otherBill, this.props.user)}>Take part</Button>)}  */}
                                        </Table.Cell>
                                    </Table.Row>
                                    <Divider hidden/>
                                    <Divider hidden fitted/>
                                    <Divider hidden fitted/>
                                    <Divider hidden fitted/>
                                    </Table.Body>
                                    {/* <Button color='yellow' size='medium' onClick={() => addNewBillForm()} >Add more bills</Button> */}
                        </Grid.Column>
                    </Grid>
                :
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
                                        <Table.HeaderCell>Have you paid?</Table.HeaderCell>
                                        <Table.HeaderCell></Table.HeaderCell>
                                        <Table.HeaderCell>You could also...</Table.HeaderCell>
                                    </Table.Row>
    
                                <Label ribbon color="yellow">Your bills</Label>
                                <Divider hidden fitted/>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h5'>
                                                <Header.Content>
                                                    {/* {bills.map(bill => <Image src={bill.img} size='small' />)} */}
                                                    {userBills.map(userBill => <p onClick={()=>this.userBillDetails(userBill)}>{userBill.name}<Icon name='info'/></p>)}
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {user_bill_splits.map(bill_split => <p><Checkbox toggle 
                                            checked={bill_split.paid} onChange={() => updateBillSplit(bill_split, this.props.user)}/></p>)}
                                        </Table.Cell>
                                        <Table.Cell>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {userBills.map(bill => <Button color='red' fluid size='small' onClick={(e) => removeBill(e, bill)}>Remove</Button>)} 
                                        </Table.Cell>
                                    </Table.Row>
                                    <Divider hidden fitted/>
                                    <Divider hidden fitted/>
                                    <Divider hidden fitted/>

                                <Label ribbon color="yellow">All other bills</Label>
                                <Divider hidden fitted/>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h5'>
                                                <Header.Content>
                                                    {/* {all_tasks.map(task => <Image src={task.img} size='small' />)} */}
                                                    {otherBills.map(otherBill => <p onClick={()=>this.otherUsersBillDetails(otherBill)}>{otherBill.name}<Icon name='info'/></p>)}
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {other_bill_splits.map(other_bill_split => <p><Checkbox toggle onChange={this.message} checked={other_bill_split.paid}/></p>)}
                                        </Table.Cell>
                                        <Table.Cell>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {otherBills.map(otherBill => <Button color='yellow' fluid size='small' onClick={(e) => addOtherBillsToCurrentUser(otherBill, this.props.user)}>Take part</Button>)} 
                                        </Table.Cell>
                                    </Table.Row>
                                    <Divider hidden/>
                                    <Divider hidden fitted/>
                                    <Divider hidden fitted/>
                                    <Divider hidden fitted/>
                                    </Table.Body>
                                    <Button color='yellow' size='medium' onClick={() => addNewBillForm()} >Add more bills</Button>
                        </Grid.Column>
                    </Grid>
                }
                    </div> 
        )
        } else {
            return (
                <div>
                { otherBills === undefined ?
                        <Grid textAlign='center' verticalAlign='top'>
                        <Divider hidden/>
                        <Grid.Column style={{ width: '80vw' }}>
                            <Table basic='very' celled collapsing>
                            <Divider hidden/>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell></Table.HeaderCell>
                                        <Table.HeaderCell>Your share</Table.HeaderCell>
                                        <Table.HeaderCell>Paid?</Table.HeaderCell>
                                        <Table.HeaderCell>Household total</Table.HeaderCell>
                                        <Table.HeaderCell>Provider</Table.HeaderCell>
                                        <Table.HeaderCell>Due date</Table.HeaderCell>
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
                                            {user_bill_splits.map(bill_split => <p>£{bill_split.amount}</p>)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {user_bill_splits.map(bill_split => <p><Checkbox toggle 
                                            checked={bill_split.paid} onChange={() => updateBillSplit(bill_split, this.props.user)}/></p>)}     
                                        </Table.Cell>
                                        <Table.Cell>
                                            {userBills.map(userBill => <p>£{userBill.total}</p>)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {userBills.map(bill => <p>{bill.provider}</p>)}
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
    
                                        </Table.Cell>
                                        <Table.Cell>
                                            {/* {other_bill_splits.map(other_bill_split => <p><Checkbox toggle onChange={this.message} checked={other_bill_split.paid}/></p>)} */}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {/* {otherBills.map(otherBill => <p>£{otherBill.total}</p>)} */}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {/* {userBills.map(bill => <p>{bill.provider}</p>)} */}
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
                        <Divider hidden/>
                        <Grid.Column style={{ width: '80vw' }}>
                            <Table basic='very' celled collapsing>
                            <Divider hidden/>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell></Table.HeaderCell>
                                        <Table.HeaderCell>Your share</Table.HeaderCell>
                                        <Table.HeaderCell>Paid?</Table.HeaderCell>
                                        <Table.HeaderCell>Household total</Table.HeaderCell>
                                        <Table.HeaderCell>Provider</Table.HeaderCell>
                                        <Table.HeaderCell>Due date</Table.HeaderCell>
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
                                            {user_bill_splits.map(bill_split => <p>£{bill_split.amount}</p>)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {user_bill_splits.map(bill_split => <p><Checkbox toggle 
                                            checked={bill_split.paid} onChange={() => updateBillSplit(bill_split, this.props.user)}/></p>)}     
                                        </Table.Cell>
                                        <Table.Cell>
                                            {userBills.map(userBill => <p>£{userBill.total}</p>)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {userBills.map(bill => <p>{bill.provider}</p>)}
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
    
                                        </Table.Cell>
                                        <Table.Cell>
                                            {other_bill_splits.map(other_bill_split => <p><Checkbox toggle onChange={this.message} checked={other_bill_split.paid}/></p>)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {otherBills.map(otherBill => <p>£{otherBill.total}</p>)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {otherBills.map(bill => <p>{bill.provider}</p>)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {otherBills.map(otherBill => <p>{otherBill.date_due}</p>)}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {otherBills.map(otherBill => <Button color='yellow' fluid size='small' onClick={(e) => addOtherBillsToCurrentUser(otherBill, this.props.user)}>Take part</Button>)} 
                                        </Table.Cell>
                                    </Table.Row>
                                    <Divider hidden/>
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
}

export default BillsCard;