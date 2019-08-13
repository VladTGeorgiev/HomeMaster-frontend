import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import logo from '../media/smart-house.png'

const LogInForm = ({ submit}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src={logo} size='small' /> Log in to your account
          </Header>
          <Form size='large' className='log-in' onSubmit={e => {
                    e.preventDefault();
                    submit({ email, password })
                    setEmail('')
                    setPassword('')
                }}>
            <Segment stacked>
              <Form.Input fluid icon='mail' iconPosition='left' placeholder='E-mail address' type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
              <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
              <Button color='teal' fluid size='large' type='submit'>Log In</Button>
            </Segment>
            </Form>
            <Message color='blue'>New to us?<a href='/signup'> <Button color='blue' size='mini'>Sign Up</Button></a></Message>
          </Grid.Column>
        </Grid>
    )
}

export default LogInForm
