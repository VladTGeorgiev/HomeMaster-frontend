import React, { Component } from 'react';
import { Grid, Loader, Image, Segment, Container, Divider } from 'semantic-ui-react'
import UsersCard from './UsersCard'
import HomeCard from '../components/HomeCard'
import BillsCard from '../components/BillsCard'
import TasksCard from '../components/TasksCard'
import EssentialsCard from '../components/EssentialsCard'
import Outstanding from '../components/Outstanding'

class Dashboard extends Component {

    buyFromAmazon = (e, name) => {
        window.location.href ='https://www.amazon.co.uk/s?k='+name
      }

    render() {
        return (
            this.props.data.home ? 
                <div>   
                    <Divider />
                    <Container>              
                        <Grid columns={2}>
                            <Grid.Column>
                                <HomeCard home={this.props.data.home} redirectToHomeProfile={this.props.redirectToHomeProfile}/>
                            </Grid.Column>
                            <Grid.Column>
                                <Outstanding data={this.props.data}/>
                                {/* ADD OUTSTANDING */}
                                {/* <div>{this.props.data.tasks.filter(task => task.completed === false).map(false_task => <p>{false_task.name}</p>)}</div> */}
                            </Grid.Column>                  
                        </Grid>
                    </Container>
                    <Divider />
                    <Container>
                        <Grid columns={3}>
                            <Grid.Column>
                                {<Grid.Column mobile={16} tablet={8} computer={4}><BillsCard bills={this.props.data.bills} bill_splits={this.props.data.bill_splits}/></Grid.Column>}
                            </Grid.Column>
                            <Grid.Column>
                                {<Grid.Column mobile={16} tablet={8} computer={4}><TasksCard tasks={this.props.data.tasks}/></Grid.Column>}
                            </Grid.Column>
                            <Grid.Column>
                                {<Grid.Column mobile={16} tablet={8} computer={4}><EssentialsCard essentials={this.props.data.essentials} buyFromAmazon={this.buyFromAmazon}/></Grid.Column>}
                            </Grid.Column>
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