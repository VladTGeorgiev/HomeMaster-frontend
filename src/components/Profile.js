import React, { useState } from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment, Dropdown, Label, Divider } from 'semantic-ui-react'
import userlogo from '../media/smile (1).png'
import userleaving from '../media/xx.png'
import legal from '../media/file.png'

const Profile = ({ user, updateUser, deleteUser, redirectToCookiePolicy }) => {

  const options = [
    { key: 'agree', text: 'Agree', value: true },
    { key: 'disagree', text: 'Disagree', value: false },
  ]

  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [password, setPassword] = useState('')
  // const [avatar, setAvatar] = useState('')

  let cookie_policy = user.cookie_policy
  const setCookiePolicy = () => {
    cookie_policy = !cookie_policy
    return cookie_policy
  }

    return (
        <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src={userlogo} size='small'/> Change your account details
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
                <Label> <div>Cookie Policy Agreement:</div> 
                  <Dropdown onChange={e => setCookiePolicy()} defaultValue={ user.cookie_policy} options={options} />
                </Label>
                <Divider hidden/>
                <Button color='teal' fluid size='large' type='submit'>Submit</Button>
            </Segment>
            </Form>
            <Divider hidden/>
            <Header as='h4' color='teal' textAlign='center'>
              <Image src={userleaving} size='small'/> Thinking of leaving us?
            </Header>
            <Message> 
                <Button onClick={() => deleteUser()} color='red' fluid size='large' type='submit'>Delete your profile</Button>
            </Message>
            <Divider hidden/>
            <Header as='h4' color='teal' textAlign='center'>
              <Image src={legal} size='small'/> The legal stuff
            </Header>
            <Message> 
                <Button onClick={() => redirectToCookiePolicy()} color='yellow' fluid size='large' type='submit'>View our Cookie Policy</Button>
            </Message>
          </Grid.Column>
        </Grid>
    )
}

export default Profile