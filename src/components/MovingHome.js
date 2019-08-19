import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Segment, Label, Divider } from 'semantic-ui-react'
import compass from '../media/compass.png'
import logoNewHome from '../media/pin-new-home.png'

const MovingHome = ({ moveToNewHome, generateRandomHomeKey, createNewHome }) => {

  const [home_key, setHomeKey] = useState('')

  const [name, setName] = useState('')
  const [address_one, setAddressOne] = useState('')
  const [address_two, setAddressTwo] = useState('')
  const [city, setCity] = useState('')
  const [postcode, setPostcode] = useState('')
  

    return (
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle' columns={2} relaxed='very'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    <Image src={compass} size='small'/>
                    <Divider hidden/>
                    <div className='comfortaa'> Moving to an existing home?</div>                  
                </Header>
                <Form size='large' className='sign-up' onSubmit={e => {
                            e.preventDefault();
                            moveToNewHome(home_key)
                            setHomeKey('')
                        }}>
                    <Segment stacked>
                        <Label>Enter the home key you've been given</Label>
                        <Divider hidden/>
                        <Form.Input fluid icon='key' iconPosition='left' placeholder="Home key" type="text" name="home_key" value={home_key} onChange={e => setHomeKey(e.target.value)}/>
                        <Button color='teal' fluid size='large' type='submit'><div className='comfortaa'>Move in to your new home!</div></Button>
                    </Segment>
                </Form> 
            </Grid.Column>

            <Grid.Column style={{ maxWidth: 450, width: '50vw' }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src={logoNewHome} size='small'/>
                                <Divider hidden/>
                                <div className='comfortaa'>Create a new home!</div>
                            </Header>
                            <Form size='large' className='sign-up' onSubmit={e => {
                                        e.preventDefault();
                                        createNewHome({name, address_one, address_two, city, postcode, home_key})
                                        setName('')
                                        setAddressOne('')
                                        setAddressTwo('')
                                        setCity('')
                                        setPostcode('')
                                        setHomeKey('')
                                    }}>
                                <Segment stacked>
                                    <Form.Input fluid required icon='home' iconPosition='left' placeholder='Home name' type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                                    <Form.Input fluid icon='marker' iconPosition='left' placeholder='Address line one' type="text" name="address_one" value={address_one} onChange={e => setAddressOne(e.target.value)}/>
                                    <Form.Input fluid icon='marker' iconPosition='left' placeholder='Address line two' type="text" name="address_two" value={address_two} onChange={e => setAddressTwo(e.target.value)}/>
                                    <Form.Input fluid icon='marker' iconPosition='left' placeholder='City' type="text" name="city" value={city} onChange={e => setCity(e.target.value)}/>
                                    <Form.Input fluid icon='world' iconPosition='left' placeholder='Postcode' type="text" name="postcode" value={postcode} onChange={e => setPostcode(e.target.value)}/>
                                    <Form.Input fluid icon='key' iconPosition='left' placeholder="Home key" type="text" name="home_key" value={home_key} onChange={e => setHomeKey(e.target.value)}/>
                                    <Label color='yellow' style={{cursor: 'pointer'}} onClick={() => generateRandomHomeKey()}>Generate random home key</Label>
                                    <Divider hidden/>
                                    <Button color='teal' fluid size='large' type='submit'><div className='comfortaa'>Submit</div></Button>
                                </Segment>
                            </Form>
                        </Grid.Column>
        </Grid>
    )
}

export default MovingHome;