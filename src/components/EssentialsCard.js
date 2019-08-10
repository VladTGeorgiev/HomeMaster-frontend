import React from 'react';
import { Grid, Table, Checkbox, Button} from 'semantic-ui-react'

const EssentailsCard = ({essentials, buyFromAmazon, removeEssential, addNewEssential}) => (
    <Grid textAlign='center' style={{ height: '50vh'}} verticalAlign='top'>
        <Grid.Column style={{ width: '80vw' }}>
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
                            <Button color='teal' size='medium' onClick={() => addNewEssential()} >Add more items</Button>                   
                        </Table.Cell>
                        <Table.Cell>
                            {essentials.map(essential => <Checkbox slider />)}           
                        </Table.Cell>
                        <Table.Cell>
                            {essentials.map(essential => 
                                    <Button color='orange' fluid size='small' onClick={(e) => buyFromAmazon(e, essential.name)}>Buy</Button>)}           
                        </Table.Cell>                        
                        <Table.Cell>
                            {essentials.map(essential => 
                                    <Button color='red' fluid size='small' onClick={(e) => removeEssential(e, essential)}>Remove</Button>)}           
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Grid.Column>
    </Grid>
)

export default EssentailsCard;