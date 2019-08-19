import React, { useState } from 'react'
import billicon from '../media/credit-card.png'
import { Button, Form, Header, Image, Segment, Divider } from 'semantic-ui-react'

const NewBill = ({ home, addNewBill }) => {

  const [name, setName] = useState('')
  const [total, setTotal] = useState('')
  const [date_due, setDateDue] = useState('')
  const [provider, setProvider] = useState('')
  const home_id = home.id

    return (
        <>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src={billicon} size='small'/><Divider hidden/><div className='comfortaa'> Add new bill</div>
          </Header>
          <Form size='large' className='sign-up' onSubmit={e => {
                    e.preventDefault();
                    addNewBill({name, total, date_due, home_id, provider})
                    setName('')
                    setTotal('')
                    setProvider('')
                    setDateDue('')
                }}>
            <Segment stacked>
                <Form.Input fluid required icon='user' iconPosition='left' required placeholder='Name' type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                <Form.Input fluid required icon='suitcase' iconPosition='left' placeholder='Provider'  type="text" name="provider" value={provider} onChange={e => setProvider(e.target.value)}/>
                <Form.Input fluid required icon='money bill alternate outline' iconPosition='left' placeholder='Total'  type="text" name="total" value={total} onChange={e => setTotal(e.target.value)}/>
                <Form.Input fluid icon='time' iconPosition='left' placeholder='Date Due' type="date" name="date_due" value={date_due} onChange={e => setDateDue(e.target.value)}/>
                <Button color='teal' fluid size='large' type='submit'><div className='comfortaa'>Submit</div></Button>
            </Segment>
            </Form>
            </>
    )
}

export default NewBill