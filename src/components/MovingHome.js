import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Segment, Label, Divider, } from 'semantic-ui-react'
import logo from '../media/compass.png'

const MovingHome = ({ moveToNewHome }) => {

  const [home_key, setHomeKey] = useState('')

    return (
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={logo} size='small'/> Moving home?
                </Header>
                <Form size='large' className='sign-up' onSubmit={e => {
                            e.preventDefault();
                            moveToNewHome(home_key)
                            setHomeKey('')
                        }}>
                    <Segment stacked>
                        <Label>Enter your new home key below</Label>
                        <Divider hidden/>
                        <Form.Input fluid icon='lock' iconPosition='left' placeholder="Home key" type="number" name="home_key" value={home_key} onChange={e => setHomeKey(e.target.value)}/>
                        <Button color='teal' fluid size='large' type='submit'>Move in to your new home!</Button>
                    </Segment>
                </Form> 
            </Grid.Column>
        </Grid>
    )
}

export default MovingHome;