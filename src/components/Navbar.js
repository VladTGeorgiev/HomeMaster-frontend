import React from 'react'
import logo from '../media/favicon.png'
import avatar from '../media/user.png'
import { Button } from 'semantic-ui-react'

const Navbar = ({ user, logOut, redirectToDashboard, redirectToUserProfile}) => {
    return (
        <div className='navbar'>
            <img className='logo' src={logo} alt="Logo" onClick={() => redirectToDashboard()}/>
            <p className='welcome-message'>HomeMaster</p>
            <p className='welcome-message'>Hello, {user.first_name}!</p>
            <img className='logo' src={avatar} alt="Logo" onClick={() => redirectToUserProfile()}/>
            {/* <button onClick={logOut}>Log Out</button> */}
            <Button color='teal' fluid size='small' onClick={logOut}>Log Out</Button>
        </div>
    )
}

export default Navbar