import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Dropdown, Label } from 'semantic-ui-react'

const Profile = ({ user, updateUser, deleteUser, redirectToCookiePolicy, moveToNewHome }) => {

  const options = [
    { key: 'agree', text: 'Agree', value: true },
    { key: 'disagree', text: 'Disagree', value: false },
  ]

  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [password, setPassword] = useState('')
  // const [avatar, setAvatar] = useState('')
  const [home_key, setHomeKey] = useState('')


  let cookie_policy = user.cookie_policy
  const setCookiePolicy = () => {
    cookie_policy = !cookie_policy
    return cookie_policy
  }

    return (
        <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='../media/user.png' /> Change your account details
          </Header>
          <Form size='large' className='sign-up' onSubmit={e => {
                    e.preventDefault();
                    updateUser({first_name, last_name, password, cookie_policy}) //add avatar
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
                <Label> Cookie Policy Agreement: 
                  <Dropdown onChange={e => setCookiePolicy()} defaultValue={ user.cookie_policy} options={options} />
                </Label>
                <Button color='teal' fluid size='large' type='submit'>Submit</Button>
            </Segment>
            </Form>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src='../media/favicon.png' /> Moving home?
                            </Header>
                            <Form size='large' className='sign-up' onSubmit={e => {
                                        e.preventDefault();
                                        moveToNewHome(home_key)
                                        setHomeKey('')
                                    }}>
                                <Segment stacked>
                                    <Label>Enter your new home key below</Label>
                                    <Form.Input fluid icon='lock' iconPosition='left' placeholder="Home key" type="number" name="home_key" value={home_key} onChange={e => setHomeKey(e.target.value)}/>
                                    <Button color='teal' fluid size='large' type='submit'>Move in to your new home!</Button>
                                </Segment>
                            </Form>
                        </Grid.Column>
            <Message> 
                <Button onClick={() => deleteUser()} color='red' fluid size='large' type='submit'>Delete your profile</Button>
            </Message>
            <Message> 
                <Button onClick={() => redirectToCookiePolicy()} color='yellow' fluid size='large' type='submit'>View our Cookie Policy</Button>
            </Message>
          </Grid.Column>
        </Grid>
    )
}

export default Profile