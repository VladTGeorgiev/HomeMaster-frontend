import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'
import cookie from '../media/cookie.jpeg'

class CookiePolicy extends Component {
    render() {
        return (
                <Image src={cookie} size='large'/>
        );
    }
}

export default CookiePolicy;