import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import { genres, getGenres } from '../services/fakeGenreService';
import ListGroup from './common/listgroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
//in order to have type checking in React, need to install yarn add prop-types@15.6.2 through
//Rosetta terminal.  Then go to pagination.jsx and use the import statement and prop type checking.
class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        selectGenres: 'allMovies',
        sortColumn: {path: 'title', order: 'asc'} 
    };

    componentDidMount() {
        const genres = [{ _id:"", name: 'All Genres' }, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

    handleDelete = movie => {
        console.log(movie);
        const movies = this.state.movies.filter(m => m._id !== movie._id);
        this.setState({ movies });
    };

    handleLike = movie => {
        console.log('like clicked');
        console.log('movie = ', movie);
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    };

    handlePageChange = page => {
        //to quickly navigate to a method, use command+p @handlePageChange and 
        //it will bring you to this method;
        console.log('page =', page);
        this.setState({ currentPage: page });
    };


    handleGenreSelection = genre => {    
        console.log(genre);
        this.setState({ selectedGenre: genre, currentPage: 1 });
        //just reset current page to 1 otherwise if you go to 
        //2nd page on all movies and use one of the other genre filters
        //it will show nothing because it will only look at the second page
        //to see if a movie in that genre exists.
    };

    handleSort = sortColumn => {
        console.log(sortColumn);
        this.setState({ sortColumn });
    }

    
  render() {
        const { length: moviesCount } = this.state.movies;
        const { 
            pageSize, 
            currentPage, 
            sortColumn,
            selectedGenre, 
            movies: allMovies, 
            genres,
        } = this.state;

    
        if (moviesCount === 0) return <p>There are no movies in the database.</p>;
        
        const filtered = selectedGenre && selectedGenre._id ?
            allMovies.filter(m => m.genre._id === selectedGenre._id) 
            : allMovies;

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

        const movies = paginate(sorted, currentPage, pageSize);
        

        return (
            <div className="row">
                    <div className="col-3">
                            <ListGroup 
                            items={this.state.genres} 
                            onItemSelect={this.handleGenreSelection}
                            selectedItem={this.state.selectedGenre}
                            />  
                        </div>
                        <div className="col">
                            <p>Showing {filtered.length} movies in the database.</p>
                            <MoviesTable
                            movies={movies}
                            sortColumn={sortColumn}
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                             />
                        <Pagination 
                            itemsCount={filtered.length} 
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                            />
                    </div>
                </div>
            )};
       
        }
    

export default Movies;
