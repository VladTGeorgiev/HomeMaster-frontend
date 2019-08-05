import React from 'react'

const Navbar = ({ user, logOut}) => {
    return (
        <div>
           Hello, {user.first_name}!
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default Navbar