import React, { Component } from 'react';
import { getMovies, deleteMovie, getMovie } from '../services/fakeMovieService';


class Movies extends Component {
  state = {
    movies: getMovies()
    //should use component life cycle hooks but haven't
    //learned this yet, per Mosh use this way for now.
  };
  handleDelete = movie => {
    console.log(movie);
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies })
}

  // quick way to render the bootstrap table element is 
  // to type: tablel.table>thead>tr>th*4
  // {/* //same with body, tbody>tr>td*4 */}
  //to add button quickly, button.btn.btn-danger.btn-sm
  render() {
        const { length: moviesCount } = this.state.movies
        if (moviesCount === 0) return <p>There are no movies in the database.</p>;
        return (
        <React.Fragment><p>Showing {moviesCount} movies in the database.</p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Stock</th>
                        <th>Rate</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.movies.map(movie => (
                    <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                        {/* in order to pass an argument here with onClick, must use arrow function. */}
                    </tr> 
                    ))}
                    
                </tbody>
            </table>  
        </React.Fragment>
        )}
    }

export default Movies;
