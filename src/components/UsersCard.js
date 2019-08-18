import React from 'react';
import { Card, Icon, Image} from 'semantic-ui-react'

const UsersCard = ({user}) => (
    <Card>
        <Image floated='right' size='mini' src={user.avatar} wrapped ui={false} />
        <Card.Content>
        <Card.Header>{user.first_name}</Card.Header>
        <Card.Meta>
            <span className='date'>{user.last_name}</span>
        </Card.Meta>
        </Card.Content>
        <Card.Content extra>
        <a href={'mailto:'+user.email}>
            <Icon name='mail' />
            {user.email}
        </a>
        </Card.Content>
    </Card>
)

export default UsersCard;