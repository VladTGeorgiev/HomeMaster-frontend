import React from 'react';
import { Card, Icon, Table, Header} from 'semantic-ui-react'

const BillsCard= ({bills, bill_splits}) => (
    <Card>
        <Card.Header as='h2'>Bills</Card.Header>
        <Table basic='very' celled collapsing>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>Amount</Table.HeaderCell>
                    <Table.HeaderCell>Due date</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Header.Content>
                                {bills.map(bill => <p>{bill.name}</p>)}
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>
                        {bill_splits.map(bill_split => <p>{bill_split.amount}</p>)}
                    </Table.Cell>
                    <Table.Cell>
                        {bills.map(bill => <p>{bill.date_due}</p>)}
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
    </Card>
)

export default BillsCard;