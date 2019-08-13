import React from 'react';
import { Grid, Table, Checkbox, Button} from 'semantic-ui-react'
class EssentailsCard extends React.Component {

    state = { 
        checked: ''
    }
    
    toggle = () => this.setState(prevState => ({ checked: !prevState.checked }))

    render() {
        const essentials = this.props.essentials
        const addNewEssential = this.props.addNewEssential
        const updateEssential = this.props.updateEssential
        const removeEssential = this.props.removeEssential
        const buyFromAmazon = this.props.buyFromAmazon
        return (
            <Grid textAlign='center' verticalAlign='top'>
                <Grid.Column style={{ width: '80vw' }}>
                    <Table basic='very' celled collapsing>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Item</Table.HeaderCell>
                                <Table.HeaderCell>Need more?</Table.HeaderCell>
                                <Table.HeaderCell>Amazon</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    {essentials.map(essential => <p>{essential.name}</p>)}                       
                                </Table.Cell>
                                <Table.Cell>
                                    {essentials.map(essential => <p><Checkbox toggle onChange={this.toggle} checked={essential.more} onChange={() => updateEssential(essential)} /></p>)}           
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
                            <Table.Row>
                                <Button color='pink' size='medium' onClick={() => addNewEssential()} >Add more items</Button>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Column>
            </Grid>

        )
    }
}
export default EssentailsCard;