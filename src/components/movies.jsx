import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';


//in order to have type checking in React, need to install yarn add prop-types@15.6.2 through
//Rosetta terminal.  Then go to pagination.jsx and use the import statement and prop type checking.
class Movies extends Component {
    state = {
        movies: getMovies(),
        currentPage: 1,
        pageSize: 4
 
    };

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
    }
    
        //when destructuring the movies from state in the render, because we are calling
        //a const movies below, it gives an error, since the const movies is referring
        //to a list of currently displayed movies we will leave that the same and
        //rename the movies in state by destructuring using movies: allMovies
        //because it is more clear and allows you to not do excessive things to 
        //chnage state name for movies
  render() {
        const { length: moviesCount } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies } = this.state;
        
        if (moviesCount === 0) return <p>There are no movies in the database.</p>;
        
        const movies = paginate(allMovies, currentPage, pageSize);

        return (
            <React.Fragment><
                p>Showing {moviesCount} movies in the database.</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Stock</th>
                            <th>Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(movie => (
                            <tr key={movie._id}>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td>
                                    <Like liked={movie.liked} onClick={() => this.handleLike(movie)}/>
                                </td>
                                <td>
                                    <button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr> 
                            )
                        )}
                    </tbody>
                </table>  
                <Pagination 
                    itemsCount={moviesCount} 
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </React.Fragment>
            )};
        }
    

export default Movies;
