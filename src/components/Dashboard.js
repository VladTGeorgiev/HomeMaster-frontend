import React, { Component } from 'react';
import { Grid, Loader, Image, Segment, Container, Divider} from 'semantic-ui-react'
import UsersCard from './UsersCard'
import HomeCard from '../components/HomeCard'
import BillsCard from '../components/BillsCard'

class Dashboard extends Component {

    render() {
        return (
            this.props.data.home ? 
                <div>   
                    <Container>              
                        <Grid columns={2}>
                            <Grid.Column>
                                <HomeCard home={this.props.data.home}/>
                            </Grid.Column>
                            <Grid.Column>
                                <HomeCard home={this.props.data.home}/>{/* ADD OUTSTANDING */}
                            </Grid.Column>                  
                        </Grid>
                    </Container>
                    <Divider />
                    <Container>
                        <Grid columns={3}>
                            {/* <Grid.Column>
                                {this.props.data.bills.map(bill => <Grid.Column mobile={16} tablet={8} computer={4}><BillsCard key={bill.id} bill={bill}/></Grid.Column>)}
                            </Grid.Column> */}
                            <Grid.Column>
                                {<Grid.Column mobile={16} tablet={8} computer={4}><BillsCard bills={this.props.data.bills} bill_splits={this.props.data.bill_splits}/></Grid.Column>}
                            </Grid.Column>


                            {/* <div>{this.props.data.bill_splits.find(bill_split => bill_split.user_id === this.props.user.id).amount}</div> */}
                            <div>{this.props.data.tasks.filter(task => task.completed === false).map(false_task => <p>{false_task.name}</p>)}</div>
                            <div>{this.props.data.essentials.map(essential => <p>{essential.name}</p>)}</div>
                        </Grid>
                    </Container>
                    <Divider />
                    <Container>
                        <Grid container>
                            {this.props.data.users.map(user => <Grid.Column mobile={16} tablet={8} computer={4}><UsersCard key={user.id} user={user}/></Grid.Column>)}
                        </Grid>
                    </Container>
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