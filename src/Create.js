import React from 'react';

class Create extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            movies: [],
            errors: {title: false, year: false, actors: false},
            genre: [
                "Action",
                "Adventure",
                "Animation",
                "Biography",
                "Comedy",
                "Crime",
                "Documentary",
                "Drama",
                "Family",
                "Fantasy",
                "Film-Noir",
                "History",
                "Horror",
                "Music",
                "Musical",
                "Mystery",
                "Romance",
                "Sci-Fi",
                "Sport",
                "Thriller",
                "War",
                "Western"
            ]
        }
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <h1>Add New Move</h1>
                </div>
                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="text-center text-danger">
                        {this.state.errors.title || this.state.errors.year || this.state.errors.actors ?
                            'No fields can be empty.' : ''
                        }
                    </div>
                    <div className={this.state.errors.title ? 'form-group has-error' : 'form-group'}>
                        <label htmlFor="title" className="col-sm-2 control-label">Title</label>
                        <div className="col-sm-8">
                            <input type="text" ref="title" className="form-control" id="title" />
                        </div>
                    </div>
                    <div className={this.state.errors.year ? 'form-group has-error' : 'form-group'}>
                        <label htmlFor="year" className="col-sm-2 control-label">Year</label>
                        <div className="col-sm-2">
                            <input type="number" ref="year" className="form-control" id="year" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre" className="col-sm-2 control-label">Genre</label>
                        <div className="col-sm-3">
                            <select id="genre" ref="genre" className="form-control">
                                {this.state.genre.map((genre, index) => {
                                    return(
                                        <option key={index} value={genre}>{genre}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className={this.state.errors.actors ? 'form-group has-error' : 'form-group'}>
                        <label htmlFor="actors" className="col-sm-2 control-label">Actors</label>
                        <div className="col-sm-8">
                            <textarea id="actors" ref="actors" className="form-control" rows="3"></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating" className="col-sm-2 control-label">Rating</label>
                        <div className="col-sm-2">
                            <select id="rating" ref="rating" className="form-control">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    handleSubmit(event) {
        // submit the form
        event.preventDefault();

        let title = this.refs.title.value;
        let year = this.refs.year.value;
        let genre = this.refs.genre.value;
        let actors = this.refs.actors.value;
        let rating = this.refs.rating.value;

        //validate form
        if(!title.trim() || !year.trim() || !actors.trim()) {
            this.setState({
                errors: {
                    title: !title.trim(),
                    year: !year.trim(),
                    actors: !actors.trim()
                }
            });
            return false;
        }

        // add movie to List
        let movies = this.state.movies.concat([{
            title: title,
            year: year,
            genre: genre,
            actors: actors.split(', '),
            rating: rating
        }]);

        // set in state
        this.setState({
            errors: {title: false, year: false, actors: false},
            movies: movies
        });

        // reset the values
        this.refs.title.value = '';
        this.refs.year.value = '';
        this.refs.genre.selectedIndex = 0;
        this.refs.actors.value = '';
        this.refs.rating.selectedIndex = 0;
    }

    componentWillMount() {
        // load movies array from localStorage, set in state
        let movieList = localStorage.getItem('movies');
        if (movieList) {
            this.setState({
                movies: JSON.parse(movieList)
            });
        }
    }

    componentDidUpdate() {
        // on each update, sync our state with localStorage
        localStorage.setItem('movies', JSON.stringify(this.state.movies));
    }
}

export default Create;
