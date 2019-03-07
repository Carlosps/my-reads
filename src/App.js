import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

import './App.css';

// Components
import ListBook from './ListBooks';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      if (books[0]) {
        this.setState({ books });
      }
    });
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={({ history }) => <Search />} />
        <Route exact path="/" render={history => <ListBook />} />
      </div>
    );
  }
}

export default BooksApp;
