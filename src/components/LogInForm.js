import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Divider } from 'semantic-ui-react'
import logo from '../media/smart-house.png'

const LogInForm = ({ submit}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
      <div>
        <div className='logo-main-page'>Home Sweet Home</div>

      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
          <Image src={logo} size='small'/>
          <Divider hidden/>
            <div className='comfortaa'>Log in</div>
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
              <Button color='teal' fluid size='large' type='submit'><div className='comfortaa'>Log In</div></Button>
            </Segment>
            </Form>
            <Message color='blue'>New to us?<a href='/signup'> <Button color='blue' size='mini'><div className='comfortaa'>Sign Up</div></Button></a></Message>
          </Grid.Column>
        </Grid>
        </div>
    )
}

export default LogInForm
