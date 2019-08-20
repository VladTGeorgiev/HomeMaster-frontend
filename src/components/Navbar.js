import React, { Component } from 'react'
import logo from '../media/smart-house.png'
import user from '../media/user.png'
import { Button, Menu, Item, Label, Header, Divider } from 'semantic-ui-react'
import swal from '@sweetalert/with-react'

export default class Navbar extends Component {

    state = { 
        activeItem: '' 
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    redirectToUserProfileCloseSwal = () => {
      this.props.redirectToUserProfile()
      swal.close()
    }

    redirectToMovingHomeCloseSwal = () => {
      this.props.redirectToMovingHome()
      swal.close()
    }

    logOutCloseSwal = () => {
      this.props.logOut()
      swal.close()
    }

    userMenu = () => {
        swal({
          buttons: {
          },
          content: (
            <div>
              <Button color='teal' size='huge' onClick={()=>this.redirectToUserProfileCloseSwal()}><div className='text'>Your profile</div></Button>
                <Divider hidden/>
              <Button color='yellow' size='huge' onClick={()=>this.redirectToMovingHomeCloseSwal()}><div className='text'>Moving home?</div></Button>
                <Divider hidden/>
              <Button color='red' size='huge' onClick={()=>this.logOutCloseSwal()}><div className='text'>Log out</div></Button>
            </div>
          ),
          closeOnClickOutside: true
        })
      }

    render() {
        const { activeItem } = this.state

        return (
        <Menu secondary widths={3}>
            <Menu.Item active position='left' name='dashboard' active={activeItem === 'dashboard'} onClick={this.handleItemClick} onClick={() => this.props.redirectToDashboard()}>
                <img src={logo} alt="Logo" size='small' />  
            </Menu.Item>
            <div className='logo'>Home Sweet Home</div>
            <Menu.Item position='right' name='PROFILE' active={activeItem === 'PROFILE'} onClick={this.handleItemClick} onClick={() => this.userMenu()}>
              <div className='welcome-message'>Hello, {this.props.user.first_name}!</div>
            <img src={user} alt="Logo"/>
            </Menu.Item>
        </Menu>
        )
    }
}