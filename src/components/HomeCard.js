import React from 'react'
import HomeCardFront from '../components/HomeCardFront'
import HomeCardBack from '../components/HomeCardBack'

class HomeCard extends React.Component {

    state = {
        front: true
    }

    showDetails = () => {
        this.setState({front: !this.state.front})
    }


    render () {
        let displayCard
        this.state.front ? displayCard = <HomeCardFront home={this.props.home} showDetails={this.showDetails}/> : displayCard = <HomeCardBack home={this.props.home}  showDetails={this.showDetails} redirectToHomeProfile={this.props.redirectToHomeProfile}/> 
        return (
            <div>{displayCard}</div>
        )
    }
}

export default HomeCard