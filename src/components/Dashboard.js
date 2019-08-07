import React, { Component } from 'react';
import HomeUser from './HomeUser'

class Dashboard extends Component {

    render() {
        console.log(this.props.data)
        return (
            this.props.data.bills ? <div>{this.props.data.bills.map(bill => <p>{bill.name}</p>)}</div> : <div>Loading...</div>
        )
    }
}

export default Dashboard;