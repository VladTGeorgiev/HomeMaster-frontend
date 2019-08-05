import React, { Component } from 'react';
import HomeUser from './HomeUser'

class Dashboard extends Component {

    render() {
        const homeusersInclUser = this.props.homeusers.filter(homeuser => homeuser.home_id === this.props.user.home_id)
        const homeusers = homeusersInclUser.filter(homeuser => homeuser.id !== this.props.user.id)
        const home = this.props.homes.find(home => home.id === this.props.user.home_id)
        if (home === undefined) {
            return (
                <div>
                    <p>{homeusers.map(homeuser => homeuser.first_name)}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <p>{home.name}</p>
                    <p>{home.address_one}</p>
                    <p>{home.address_two}</p>
                    <p>{home.city}</p>
                    <p>{home.postcode}</p>
                    <div>{homeusers.map(homeuser => <HomeUser key={homeuser.id} homeuser={homeuser}/>)}</div>
                </div>
        );
        }
    }
}

export default Dashboard;