import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const Profile = ({ user, submit, deleteUser }) => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [password, setPassword] = useState('')
    // const [avatar, setAvatar] = useState('')

    return (
        <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='../media/user.png' /> Change your account details
          </Header>
          <Form size='large' className='sign-up' onSubmit={e => {
                    e.preventDefault();
                    submit({first_name, last_name, password}) //add avatar
                    setFirstName('')
                    setLastName('')
                    setPassword('')
                    // setAvatar('')
                }}>
            <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder={user.first_name} type="text" name="first_name" value={first_name} onChange={e => setFirstName(e.target.value)} />
                <Form.Input fluid icon='user' iconPosition='left' placeholder={user.last_name}  type="text" name="last_name" value={last_name} onChange={e => setLastName(e.target.value)}/>
                <Form.Input fluid icon='lock' iconPosition='left' required placeholder='Password' type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                {/* <Form.Input fluid icon='photo' iconPosition='left' placeholder="Avatar" type="img" name="avatar" value={avatar} onChange={e => setAvatar(e.target.value)}/> */}
                <Button color='teal' fluid size='large' type='submit'>Submit</Button>
            </Segment>
            </Form>
            <Message> 
                <Button onClick={() => deleteUser()} color='red' fluid size='large' type='submit'>Delete</Button>
            </Message>
          </Grid.Column>
        </Grid>
    )
}

export default Profile