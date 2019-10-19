import React, { Component } from 'react';

class CurrentHomeUser extends Component {
	render () {
		if (!this.props.homeuser) {
			return <div />;
		} else {
			return (
				<div>
					<p>{this.props.homeuser.first_name}</p>
				</div>
			);
		}
	}
}

export default CurrentHomeUser;
