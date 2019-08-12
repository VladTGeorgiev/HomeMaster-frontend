import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const SugnUpForm = ({ submit }) => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [home_id, setHomeId] = useState('')
    const cookie_policy = false

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='../media/favicon.png' /> Sign up for a new your account
          </Header>
          <Form size='large' className='sign-up' onSubmit={e => {
                    e.preventDefault();
                    submit({first_name, last_name, email, password, home_id, cookie_policy })
                    setFirstName('')
                    setLastName('')
                    setEmail('')
                    setPassword('')
                    setHomeId('')
                }}>
            <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder="First Name" type="text" name="first_name" value={first_name} onChange={e => setFirstName(e.target.value)} />
                <Form.Input fluid icon='user' iconPosition='left' placeholder="Last Name" type="text" name="last_name" value={last_name} onChange={e => setLastName(e.target.value)}/>
                <Form.Input required fluid icon='mail' iconPosition='left' placeholder='E-mail address' type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <Form.Input required fluid icon='lock' iconPosition='left' placeholder='Password' type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <Form.Input required fluid icon='lock' iconPosition='left' placeholder="Home Key" type="text" name="home_id" value={home_id} onChange={e => setHomeId(e.target.value)}/>
                <Button color='teal' fluid size='large' type='submit'>Sign Up</Button>
            </Segment>
            </Form>
            <Message>Already have an account? <a href='/login'>Log In</a></Message>
          </Grid.Column>
        </Grid>
    )
}

export default SugnUpForm