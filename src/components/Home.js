import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Label, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { setServers } from 'dns';

const SugnUpForm = ({ data, submitNewHomeDetails, submitNewHomeId, submitBillUpdate }) => {

    const [name, setName] = useState('')
    const [address_one, setAddressOne] = useState('')
    const [address_two, setAddressTwo] = useState('')
    const [city, setCity] = useState('')
    const [postcode, setPostcode] = useState('')

    const [home_id, setHomeId] = useState('')

    return (
        <div>
            {data.home ? 
                <div>
                    <Grid textAlign='center' style={{ height: '50vh'}} verticalAlign='top'>
                        <Grid.Column style={{ maxWidth: 450, width: '50vw' }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src='../media/user.png' /> Home details
                            </Header>
                            <Form size='large' className='sign-up' onSubmit={e => {
                                        e.preventDefault();
                                        submitNewHomeDetails({name, address_one, address_two, city, postcode})
                                        setName('')
                                        setAddressOne('')
                                        setAddressTwo('')
                                        setCity('')
                                        setPostcode('')
                                    }}>
                                <Segment stacked>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder={data.home.name} type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder={data.home.address_one} type="text" name="address_one" value={address_one} onChange={e => setAddressOne(e.target.value)}/>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder={data.home.address_two} type="text" name="address_two" value={address_two} onChange={e => setAddressTwo(e.target.value)}/>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder={data.home.city} type="text" name="city" value={city} onChange={e => setCity(e.target.value)}/>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder={data.home.postcode} type="text" name="postcode" value={postcode} onChange={e => setPostcode(e.target.value)}/>
                                    {/* <Form.Input fluid icon='lock' iconPosition='left' placeholder={data.home.id} type="text" readOnly/> */}
                                    <Button color='teal' fluid size='large' type='submit'>Submit</Button>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>
                    <Grid textAlign='center' style={{ height: '50vh' }} >
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src='../media/favicon.png' /> Moving home?
                            </Header>
                            <Form size='large' className='sign-up' onSubmit={e => {
                                        e.preventDefault();
                                        submitNewHomeId({home_id })
                                        setHomeId('')
                                    }}>
                                <Segment stacked>
                                    <Label>Enter your new home key below</Label>
                                    <Form.Input fluid icon='lock' iconPosition='left' placeholder="Home key" type="number" name="home_id" value={home_id} onChange={e => setHomeId(e.target.value)}/>
                                    <Button color='teal' fluid size='large' type='submit'>Move in to your new home!</Button>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </div>
            :
            <div>
                <Segment>
                    <Dimmer active>
                        <Loader>Loading</Loader>
                    </Dimmer>
                    <Image src='/images/wireframe/short-paragraph.png' />
                </Segment>
                <Segment>
                    <Dimmer active inverted>
                        <Loader inverted>Loading</Loader>
                    </Dimmer>
                    <Image src='/images/wireframe/short-paragraph.png' />
                </Segment>
            </div>
            }
        </div>
    )
}

export default SugnUpForm