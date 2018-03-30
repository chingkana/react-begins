import React, { Component } from 'react';

class RepoDetails extends Component {

    render() {
        console.log("props ", this.props);
        return (
            this.props.repos.map((repo, index) =>
                <span className="repo-list" key={index}>
                    {repo.name} - {repo.stargazers_count}
                    <br />
                </span>
            )
        );
    }
}

export default RepoDetails;







