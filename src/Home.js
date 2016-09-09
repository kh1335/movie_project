import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="jumbotron text-center">
                    <h1>Movie Project</h1>
                    <p>Create, Search, and View list of movies in your own movie database</p>
                    <a className="btn btn-primary home-btn" href="/create" role="button">Add Movie</a>
                    <a className="btn btn-primary home-btn" href="/list" role="button">View List</a>
                </div>
            </div>
        )
    }
}

export default Home;
