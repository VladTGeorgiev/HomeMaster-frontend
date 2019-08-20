import React, { Component } from 'react';
import { Card, Icon, Label, Button, Divider } from 'semantic-ui-react'

class HomeCardBack extends Component {
    render() {
        let home = this.props.home
        let redirectToHomeProfile = this.props.redirectToHomeProfile
        return (
            <Card onClick = {this.props.showDetails}>
                {/* <Image src={} wrapped ui={false} /> */}
                <Card.Content>
                <Card.Header><div className='text-home-name'>{home.name}</div></Card.Header>
                <Divider hidden />
                <Card.Meta>
                    <span className='date'>{home.address_one}</span>
                </Card.Meta>
                <Card.Meta>
                    <span className='date'>{home.address_two}</span>
                </Card.Meta>
                <Card.Meta>
                    <span className='date'>{home.city}</span>
                </Card.Meta>
                <Card.Meta>
                    <span className='date'>{home.postcode}</span>
                </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                <Card.Meta>
                    <Label>
                        <Icon name='key' /> Home key
                    </Label>
                    <span className='date'>{home.home_key}</span>
                </Card.Meta>
                </Card.Content>
                <Button color='teal' fluid size='small' onClick={() => redirectToHomeProfile()}><div className='comfortaa'>Change home details</div></Button>
            </Card>
        );
    }
}

export default HomeCardBack;