import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Label, Segment, Dimmer, Loader, Divider } from 'semantic-ui-react'
import logo from '../media/pin.png'

const Home = ({ data, submitNewHomeDetails }) => {

    const [name, setName] = useState('')
    const [address_one, setAddressOne] = useState('')
    const [address_two, setAddressTwo] = useState('')
    const [city, setCity] = useState('')
    const [postcode, setPostcode] = useState('')
    // const id = data.home.id
    // const [home_key, setHomeKey] = useState('')

    return (
        <div>
            {data.home ? 
                <div>
                    <Grid textAlign='center' style={{ height: '80vh'}} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450, width: '50vw' }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src={logo} size='small'/>
                                <Divider hidden/>
                                <div className='comfortaa'> Home details</div>
                            </Header>
                            <Form size='large' className='sign-up' onSubmit={e => {
                                        e.preventDefault();
                                        submitNewHomeDetails({name, address_one, address_two, city, postcode})
                                        setName('')
                                        setAddressOne('')
                                        setAddressTwo('')
                                        setCity('')
                                        setPostcode('')
                                        // setHomeKey('')
                                    }}>
                                <Segment stacked>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder={data.home.name} type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                                    <Form.Input fluid icon='marker' iconPosition='left' placeholder={data.home.address_one} type="text" name="address_one" value={address_one} onChange={e => setAddressOne(e.target.value)}/>
                                    <Form.Input fluid icon='marker' iconPosition='left' placeholder={data.home.address_two} type="text" name="address_two" value={address_two} onChange={e => setAddressTwo(e.target.value)}/>
                                    <Form.Input fluid icon='marker' iconPosition='left' placeholder={data.home.city} type="text" name="city" value={city} onChange={e => setCity(e.target.value)}/>
                                    <Form.Input fluid icon='marker' iconPosition='left' placeholder={data.home.postcode} type="text" name="postcode" value={postcode} onChange={e => setPostcode(e.target.value)}/>
                                    {/* <Form.Input fluid icon='lock' readOnly iconPosition='left' placeholder={data.home.id} type="number" name="home_key" value={home_key} onChange={e => setHomeKey(e.target.value)}/> */}
                                    {/* <Form.Input fluid icon='lock' iconPosition='left' placeholder={data.home.id} type="text" readOnly/> */}
                                    <Button color='teal' fluid size='large' type='submit'><div className='comfortaa'>Submit</div></Button>
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

export default Home