import React, { useState } from 'react'
import { Button, Form, Header, Image, Segment } from 'semantic-ui-react'

const NewTask = ({ user, home, addNewTask }) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [day, setDay] = useState('')
  const completed = false
  const home_id = home.id
  const user_id = user.id

    return (
        <>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='../media/user.png' /> Add new task
          </Header>
          <Form size='large' className='sign-up' onSubmit={e => {
                    e.preventDefault();
                    addNewTask({name, description, day, completed, home_id, user_id})
                    setName('')
                    setDescription('')
                    setDay('')
                }}>
            <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' required placeholder='Name' type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Description'  type="text" name="description" value={description} onChange={e => setDescription(e.target.value)}/>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Day' type="text" name="day" value={day} onChange={e => setDay(e.target.value)}/>
                <Button color='teal' fluid size='large' type='submit'>Submit</Button>
            </Segment>
            </Form>
            </>
    )
}

export default NewTask