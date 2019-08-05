import React, { useState } from 'react'

const SugnUpForm = ({ submit, header }) => {

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [home_id, setHomeId] = useState('')

    return (
        <form onSubmit={e => {
            e.preventDefault();
            submit({first_name, last_name, email, password, home_id })
            // setFirstName('')
            // setLastName('')
            // setEmail('')
            // setPassword('')
            // setHomeId('')
        }}>
            <span>{header}</span>
            <input placeholder="First Name" type="text" name="first_name" value={first_name} onChange={e => setFirstName(e.target.value)} />
            <input placeholder="Last Name" type="text" name="last_name" value={last_name} onChange={e => setLastName(e.target.value)} />
            <input placeholder="Email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder="Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            <input placeholder="Home" type="number" name="home_id" value={home_id} onChange={e => setHomeId(e.target.value)} />
            <input type="submit" />
        </form>
    )
}

export default SugnUpForm