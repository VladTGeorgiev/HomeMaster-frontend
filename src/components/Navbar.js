import React, { Component } from 'react'
import logo from '../media/favicon.png'
import avatar from '../media/user.png'
import { Button, Menu } from 'semantic-ui-react'

export default class Navbar extends Component {
    state = { 
        activeItem: '' 
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state

        return (
        <Menu>
            <Menu.Item name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick}>
                <img className='logo' src={logo} alt="Logo" onClick={() => this.props.redirectToDashboard()}/>  
            </Menu.Item>
            <p className='welcome-message'>HomeMaster</p>

            <p className='welcome-message'>Hello, {this.props.user.first_name}!</p>
            <Menu.Item name='PROFILE' active={activeItem === 'PROFILE'} onClick={this.handleItemClick}>
            <img className='logo' src={avatar} alt="Logo" onClick={() => this.props.redirectToUserProfile()}/>
            </Menu.Item>

            <Button color='teal' fluid size='small' onClick={this.props.logOut}>Log Out</Button>
        </Menu>
        )
    }
}