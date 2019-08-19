import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Divider } from 'semantic-ui-react'
import logo from '../media/smart-house.png'
import defaultAvatar from '../media/user.png'

const SugnUpForm = ({ submit }) => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [home_id, setHomeId] = useState('')
    const cookie_policy = false
    const home_id = "1"
    const avatar = {defaultAvatar}

    return (
      <div>
      <div className='logo-main-page'>Home Sweet Home</div>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' textAlign='center'>
            <Divider hidden/>
            <Image src={logo} size='small'/>
            <Divider hidden/>
            <div className='comfortaa'> Sign up for a new account</div>
          </Header>
          <Form size='large' className='sign-up' onSubmit={e => {
                    e.preventDefault();
                    submit({first_name, last_name, email, password, home_id, cookie_policy, avatar })
                    setFirstName('')
                    setLastName('')
                    setEmail('')
                    setPassword('')
                    // setHomeId('')
                }}>
            <Segment stacked>
                <Form.Input required fluid icon='user' iconPosition='left' placeholder="First Name" type="text" name="first_name" value={first_name} onChange={e => setFirstName(e.target.value)} />
                <Form.Input required fluid icon='user' iconPosition='left' placeholder="Last Name" type="text" name="last_name" value={last_name} onChange={e => setLastName(e.target.value)}/>
                <Form.Input required fluid icon='mail' iconPosition='left' placeholder='E-mail address' type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <Form.Input required fluid icon='lock' iconPosition='left' placeholder='Password' type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                {/* <Form.Input fluid icon='lock' iconPosition='left' placeholder="Home Key" type="text" name="home_id" value={home_id} onChange={e => setHomeId(e.target.value)}/> */}
                <Button color='blue' fluid size='large' type='submit'><div className='comfortaa'>Sign Up</div></Button>
            </Segment>
            </Form>
            <Message color='teal'>Already have an account?<a href='/login'> <Button color='teal' size='mini'><div className='comfortaa'>Log in</div></Button></a></Message>
          </Grid.Column>
        </Grid>
        </div>
    )
}

export default SugnUpForm