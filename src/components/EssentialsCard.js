import React from 'react';
import { Card, Table, Checkbox, Button} from 'semantic-ui-react'

const EssentailsCard = ({essentials, buyFromAmazon}) => (
    <Card>
        <Card.Header as='h2'>Household essentials</Card.Header>
        <Table basic='very' celled collapsing>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Item</Table.HeaderCell>
                    <Table.HeaderCell>Need more?</Table.HeaderCell>
                    <Table.HeaderCell>Amazon</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>
                        {essentials.map(essential => <p>{essential.name}</p>)}                       
                    </Table.Cell>
                    <Table.Cell>
                        {essentials.map(essential => <Checkbox slider />)}           
                    </Table.Cell>
                    <Table.Cell>
                        {essentials.map(essential => 
                                <Button color='orange' fluid size='small' onClick={(e) => buyFromAmazon(e, essential.name)}>Buy</Button>)}           
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table>
        <Button color='teal' fluid size='medium' >Add more</Button>
    </Card>
)

export default EssentailsCard;