import React from 'react'
import logo from '../media/favicon.png'
import avatar from '../media/user.png'

const Navbar = ({ user, logOut, redirectToDashboard, redirectToUserProfile}) => {
    return (
        <div className='navbar'>
            <img className='logo' src={logo} alt="Logo" onClick={() => redirectToDashboard()}/>
            <p className='welcome-message'>HomeMaster</p>
            <p className='welcome-message'>Hello, {user.first_name}!</p>
            <img className='logo' src={avatar} alt="Logo" onClick={() => redirectToUserProfile()}/>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default Navbar