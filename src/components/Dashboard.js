import React, { Component } from 'react';
// import HomeUser from './HomeUser'
import { Card } from 'semantic-ui-react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

class Dashboard extends Component {

    render() {
        return (
            this.props.data.bills ? 
                <div>
                    <Card>
                    <div className="header">{this.props.data.home.name}</div>
                    
                    <div>{this.props.data.bills.map(bill => <p>{bill.name}</p>)}</div>
                    <br/>
                    <div>{this.props.data.tasks.filter(task => task.completed === false).map(false_task => <p>{false_task.name}</p>)}</div>
                    <br/>
                    <div>{this.props.data.essentials.map(essential => <p>{essential.name}</p>)}</div>
                    <div>{this.props.data.users.map(user => <p>{user.first_name}</p>)}</div>
                    <div>{this.props.data.bill_splits.find(bill_split => bill_split.user_id === this.props.user.id).amount}</div>
                    </Card>
                </div>
            : 
                <Segment>
                    <Loader />
                    <Image src='/images/wireframe/short-paragraph.png' />
                </Segment>
        )
    }
}

export default Dashboard;