import React from 'react';
import { Card, Image } from 'semantic-ui-react'

const UsersCardMobile = ({user, showDetails}) => (
    <Card onClick = {showDetails}>
        <Image floated='right' size='mini' src={user.avatar} wrapped ui={false} />
        <Card.Content>
        <Card.Header>{user.first_name}</Card.Header>
        </Card.Content>
    </Card>
)

export default UsersCardMobile;