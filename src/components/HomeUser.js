import React, { Component } from 'react';

class HomeUser extends Component {
    render() {
        if (!this.props.homeuser){
            return (
                <div>
                </div>
            );
        } else {
            return (
                <div>
                    <p>{this.props.homeuser.first_name}</p>
                </div>
            );
        }
    }
}

export default HomeUser;