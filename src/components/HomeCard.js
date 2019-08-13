import React from 'react'
import { Card, Icon, Image, Label, Button, Divider } from 'semantic-ui-react'

const HomeCard = ({home, redirectToHomeProfile}) => (
        <Card>
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
                    <Icon name='lock' /> Home key
                </Label>
                <span className='date'>{home.id}</span>
            </Card.Meta>
            </Card.Content>
            <Button color='teal' fluid size='small' onClick={() => redirectToHomeProfile()}>Change home details</Button>
        </Card>
)

export default HomeCard