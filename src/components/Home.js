import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const SugnUpForm = ({ user, submit }) => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [home_id, setHomeId] = useState('')

    return (
        <div>
        <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='../media/user.png' /> Change your home details
          </Header>
          <Form size='large' className='sign-up' onSubmit={e => {
                    e.preventDefault();
                    submit({first_name, last_name, password, home_id })
                    setFirstName('')
                    setLastName('')
                    setPassword('')
                    setHomeId('')
                }}>
            <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder="First Name" type="text" name="first_name" value={first_name} onChange={e => setFirstName(e.target.value)} />
                <Form.Input fluid icon='lock' iconPosition='left' placeholder="Last Name" type="text" name="last_name" value={last_name} onChange={e => setLastName(e.target.value)}/>
                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <Form.Input fluid icon='lock' iconPosition='left' placeholder="Home" type="number" name="home_id" value={home_id} onChange={e => setHomeId(e.target.value)}/>
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
                        submit({home_id })
                        setHomeId('')
                    }}>
                <Segment stacked>
                    <Message>Enter your new home key:</Message>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder="Home key" type="number" name="home_id" value={home_id} onChange={e => setHomeId(e.target.value)}/>
                    <Button color='teal' fluid size='large' type='submit'>Move in to your new home!</Button>
                </Segment>
            </Form>
            </Grid.Column>
        </Grid>
</div>
    )
}

export default SugnUpForm