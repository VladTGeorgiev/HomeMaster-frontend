import React, { Component } from 'react';
import { Card, Icon, Label } from 'semantic-ui-react'

class HomeCardFront extends Component {
    render() {
        let home = this.props.home
        return (
            <Card onClick = {this.props.showDetails}>
                <Card.Content>
                <Card.Header><div className='text-home-name'>{home.name}</div></Card.Header>
                </Card.Content>
                <Card.Content extra>
                <Card.Meta>
                    <Label>
                        <Icon name='key' /> Home key
                    </Label>
                    <span className='date'>{home.home_key}</span>
                </Card.Meta>
                </Card.Content>
            </Card>
        );
    }
}

export default HomeCardFront;