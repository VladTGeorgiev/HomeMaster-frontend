import React from 'react'
import { Card, Icon, Image, Label } from 'semantic-ui-react'

const UsersCard = ({home}) => (
        <Card>
            {/* <Image src={} wrapped ui={false} /> */}
            <Card.Content>
            <Card.Header as='h1'>{home.name}</Card.Header>
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
                    <Icon name='lock' />
                </Label>
                <span className='date'>{home.id}</span>
            </Card.Meta>
            </Card.Content>
        </Card>
)

export default UsersCard