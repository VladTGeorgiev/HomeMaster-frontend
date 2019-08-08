import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const LogInForm = ({ submit}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='../media/favicon.png' /> Log in to your account
          </Header>
          <Form size='large' className='log-in' onSubmit={e => {
                    e.preventDefault();
                    submit({ email, password })
                    setEmail('')
                    setPassword('')
                }}>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
              <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
              <Button color='teal' fluid size='large' type='submit'>Log In</Button>
            </Segment>
            </Form>
            <Message>New to us? <a href='/signup'>Sign Up</a></Message>
          </Grid.Column>
        </Grid>
    )
}

export default LogInForm
