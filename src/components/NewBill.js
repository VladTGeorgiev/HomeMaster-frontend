import React, { useState } from 'react'
import billicon from '../media/credit-card.png'
import { Button, Form, Header, Image, Segment } from 'semantic-ui-react'

const NewBill = ({ home, addNewBill }) => {

  const [name, setName] = useState('')
  const [total, setTotal] = useState('')
  const [date_due, setDateDue] = useState('')
  const home_id = home.id

    return (
        <>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src={billicon} size='small'/> Add new bill
          </Header>
          <Form size='large' className='sign-up' onSubmit={e => {
                    e.preventDefault();
                    addNewBill({name, total, date_due, home_id})
                    setName('')
                    setTotal('')
                    setDateDue('')
                }}>
            <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' required placeholder='Name' type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Total'  type="text" name="total" value={total} onChange={e => setTotal(e.target.value)}/>
                <Form.Input fluid icon='time' iconPosition='left' placeholder='Date Due' type="date" name="date_due" value={date_due} onChange={e => setDateDue(e.target.value)}/>
                <Button color='teal' fluid size='large' type='submit'>Submit</Button>
            </Segment>
            </Form>
            </>
    )
}

export default NewBill