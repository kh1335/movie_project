import React from 'react';

class Search extends React.Component {
    render() {
        return (
            <div>
                <form name="search-form" className="form-inline text-center search-form">
                    <div className="form-group">
                        <label htmlFor="search-field" className="sr-only control-label">Rating</label>
                        <div className="col-sm-2">
                            <select id="search-field" ref="field" className="form-control">
                                <option value="title">Title</option>
                                <option value="year">Year</option>
                                <option value="genre">Genre</option>
                                <option value="actors">Actors</option>
                                <option value="rating">Rating</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="sr-only" htmlFor="search-term">Search</label>
                        <div className="input-group">
                            <input type="text" ref="term" className="form-control" id="search-term" placeholder="Search" onKeyPress={this.handleEnter.bind(this)} />
                            <div className="btn input-group-addon" onClick={this.handleSearch.bind(this)}><span className="glyphicon glyphicon-search"></span></div>
                        </div>
                    </div>
                    <div className="form-group clear-btn">
                        <button className="btn btn-primary" ref="clear" onClick={this.handleClearSearch.bind(this)}>Clear Search</button>
                    </div>
                </form>
            </div>
        )
    }

    handleEnter(event) {
        // search when enter key is pressed
        if(event.charCode == 13) {
            event.preventDefault();
            this.handleSearch();
        }
    }

    handleSearch() {
        let field = this.refs.field.value;
        let term = this.refs.term.value;

        // make sure term is not empty
        if(!term.trim()) {
            return false;
        }

        // filter out only movies with field and term
        let filtered = this.props.movies.filter((movie) => {
            if(Array.isArray(movie[field])) {
                return movie[field].filter((item) => {
                    return item.indexOf(term) > -1
                }).length > 0;
            }

            return movie[field].indexOf(term) > -1;
        });

        this.props.updateList(filtered);
    }

    handleClearSearch(event) {
        event.preventDefault();

        // set search fields to default value
        this.refs.field.selectedIndex = 0;
        this.refs.term.value = '';

        this.props.updateList([], true);
    }
}

class MovieList extends React.Component {
    render() {
        return (
            <div className="row well list">
                {(this.props.movies.length > 0) ?
                    this.props.movies.map((movie, index) => {
                        return (
                            <div key={index} className="col-md-4">
                                <div className="panel panel-default">
                                    <div className="panel-heading clearfix">
                                        <span data-movieid={index} className="glyphicon glyphicon-trash text-danger pull-right" onClick={this.handleDelete.bind(this)}></span>
                                        <h3 className="panel-title">{movie.title} ({movie.year})</h3>
                                    </div>
                                    <div className="panel-body">
                                        <div>Genre: {movie.genre}</div>
                                        <div>Actors: {movie.actors.join(', ')}</div>
                                        <div>Rating: {movie.rating}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) :
                    <div className="text-danger text-center">There Are No Movies To Show</div>
            }
            </div>
        )
    }

    handleDelete(event) {
        let movieid = event.target.getAttribute('data-movieid');

        // filter out movie that was deleted
        let filtered = this.props.movies.filter((movie, index) => {
            return index != movieid
        });

        this.props.deleteMovie(filtered);
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            searchMovies: []
        }
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <h1>Movie List</h1>
                </div>
                <Search movies={this.state.movies}  updateList={this.updateList.bind(this)} />
                <MovieList movies={this.state.searchMovies} deleteMovie={this.deleteMovie.bind(this)} />
            </div>
        )
    }

    updateList(movies, replace = false) {
        // update movies to show all or filtered by search
        if (!replace) {
            this.setState({
                searchMovies: movies
            });
        } else {
            this.setState({
                searchMovies: JSON.parse(localStorage.getItem('movies'))
            });
        }
    }

    deleteMovie(movies) {
        // set movies and searchMovies and save to localStorage
        this.setState({
            movies: movies,
            searchMovies: movies
        });

        localStorage.setItem('movies', JSON.stringify(movies));
    }

    componentWillMount() {
        // load items array from localStorage, set in state
        let movieList = localStorage.getItem('movies');
        if (movieList) {
            this.setState({
                movies: JSON.parse(movieList),
                searchMovies: JSON.parse(movieList)
            });
        }
    }
}

export default List;
