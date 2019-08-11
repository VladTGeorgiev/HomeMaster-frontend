import React from 'react';
import { Table, Header, Image, Grid, Button} from 'semantic-ui-react'

const BillsCard= ({bills, bill_splits, addNewBill, removeBill}) => (
    <Grid textAlign='center' style={{ height: '50vh'}} verticalAlign='top'>
        <Grid.Column style={{ width: '80vw' }}>
            <Table basic='very' celled collapsing>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell>Household total</Table.HeaderCell>
                        <Table.HeaderCell>Your share</Table.HeaderCell>
                        <Table.HeaderCell>Due date</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Header as='h4'>
                                <Header.Content>
                                    {bills.map(bill => <>
                                    <Image src={bill.img} size='small' />
                                    <p>{bill.name}</p>
                                    </>
                                    )}
                                    <Button color='yellow' size='medium' onClick={() => addNewBill()} >Add more bills</Button>
                                </Header.Content>
                            </Header>
                        </Table.Cell>
                        <Table.Cell>
                            {bills.map(bill => <p>£{bill.total}</p>)}
                        </Table.Cell>
                        <Table.Cell>
                            {bill_splits.map(bill_split => <p>£{bill_split.amount}</p>)}
                        </Table.Cell>
                        <Table.Cell>
                            {bills.map(bill => <p>{bill.date_due}</p>)}
                        </Table.Cell>
                        <Table.Cell>
                            {bills.map(bill => <Button color='red' fluid size='small' onClick={(e) => removeBill(e, bill)}>Remove</Button>)} 
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Grid.Column>
    </Grid>
)

export default BillsCard;