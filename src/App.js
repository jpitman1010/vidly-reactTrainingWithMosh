import React, { Component } from 'react';
import { getMovies, deleteMovie, getMovie } from './services/fakeMovieService';
import Movies from './components/movies';
class App extends Component {

  render() {
    
  return (
    <main className="container">
      <Movies />
    </main>
    );
  }


}
 

export default App;
