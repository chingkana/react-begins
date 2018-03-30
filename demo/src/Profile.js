import React, { Component } from 'react'

class Profile extends Component {
    render() {
        console.log("props", this.props);
        return (
            <div>
                <img className="user-image" src={this.props.avatar} alt="{this.state.userName}" />
                <br />
                <span>{this.props.description}</span>
            </div>
        );
    }
}

export default Profile;
