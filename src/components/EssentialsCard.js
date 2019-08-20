import React from 'react';
import { Grid, Table, Checkbox, Button, Divider, Header, Label} from 'semantic-ui-react'
class EssentailsCard extends React.Component {

    render() {
        const essentials = this.props.essentials
        const neededEssentials = essentials.filter(essential => essential.more === true)
        const notNeededEssentials = essentials.filter(essential => essential.more === false)
        const addNewEssential = this.props.addNewEssential
        const updateEssential = this.props.updateEssential
        const removeEssential = this.props.removeEssential
        const buyFromAmazon = this.props.buyFromAmazon

        const width = this.props.width;
        const isMobile = width < 550;

        if (isMobile) {
            return (
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
                                    <Table.HeaderCell>Need more?</Table.HeaderCell>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>You could also...</Table.HeaderCell>
                                </Table.Row>
    
                            <Label ribbon color="pink">Needed</Label>
                            <Divider hidden fitted/>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h5'>
                                            <Header.Content>
                                                {neededEssentials.map(essential => <p>{essential.name}</p>)}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {neededEssentials.map(essential => <p><Checkbox toggle checked={essential.more} onChange={() => updateEssential(essential)} /></p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {neededEssentials.map(essential => <Button color='orange' fluid size='small' onClick={(e) => buyFromAmazon(e, essential.name)}><div className='comfortaa'>Amazon</div></Button>)}
                                    </Table.Cell>
                                </Table.Row>
                                <Divider hidden fitted/>
                                <Divider hidden fitted/>
                                <Divider hidden fitted/>
    
                            <Label ribbon color="pink">We have enough of these</Label>
                            <Divider hidden fitted/>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h5'>
                                            <Header.Content>
                                                {notNeededEssentials.map(essential => <p>{essential.name}</p>)}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {notNeededEssentials.map(essential => <p><Checkbox toggle checked={essential.more} onChange={() => updateEssential(essential)} /></p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {notNeededEssentials.map(essential => <Button color='red' fluid size='small' onClick={(e) => removeEssential(e, essential)}><div className='comfortaa'>Remove</div></Button>)}
                                    </Table.Cell>
                                </Table.Row>
                                <Divider hidden/>
                                <Divider hidden fitted/>
                                <Divider hidden fitted/>
                                <Divider hidden fitted/>

                            </Table.Body>
                            <Button color='pink' size='medium' onClick={() => addNewEssential()} ><div className='comfortaa'>Add more items</div></Button>
                    </Grid.Column>
                </Grid>
    
            )
        } else {
            return (
                <Grid textAlign='center' verticalAlign='top'>
                    <Divider hidden/>
                    <Grid.Column style={{ width: '80vw' }}>
                        <Table basic='very' celled collapsing>
                        <Divider hidden/>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell></Table.HeaderCell>
                                    <Table.HeaderCell>Need more?</Table.HeaderCell>
                                    <Table.HeaderCell>You could also...</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
    
                            <Table.Body>
                            <Label ribbon color="pink">Needed</Label>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h5'>
                                            <Header.Content>
                                                {neededEssentials.map(essential => <p>{essential.name}</p>)}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {neededEssentials.map(essential => <p><Checkbox toggle checked={essential.more} onChange={() => updateEssential(essential)} /></p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {neededEssentials.map(essential => <Button color='orange' fluid size='small' onClick={(e) => buyFromAmazon(e, essential.name)}><div className='comfortaa'>Buy from Amazon</div></Button>)}
                                    </Table.Cell>
                                </Table.Row>
    
                            <Label ribbon color="pink">We have enough of these</Label>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h5'>
                                            <Header.Content>
                                                {notNeededEssentials.map(essential => <p>{essential.name}</p>)}
                                            </Header.Content>
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {notNeededEssentials.map(essential => <p><Checkbox toggle checked={essential.more} onChange={() => updateEssential(essential)} /></p>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {notNeededEssentials.map(essential => <Button color='red' fluid size='small' onClick={(e) => removeEssential(e, essential)}><div className='comfortaa'>Remove</div></Button>)}
                                    </Table.Cell>
                                </Table.Row>
                                <Divider hidden/>
                                <Table.Row>
                                    <Button color='pink' size='medium' onClick={() => addNewEssential()} ><div className='comfortaa'>Add more items</div></Button>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
    
            )
        }
    }
}
export default EssentailsCard;