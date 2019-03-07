import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

import './App.css';

// Components
import ListBook from './ListBooks';
import Search from './Search';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.updateBookCategory = this.updateBookCategory.bind(this);
  }

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

  updateBookCategory(event, book) {
    const shelf = event.target.value;
    if (shelf !== book.shelf) {
      let bookIsInList = false;
      let books = this.state.books.map(currentBook => {
        if (book.id === currentBook.id) {
          currentBook.shelf = shelf;
          bookIsInList = true;
        }
        return currentBook;
      });

      if (shelf === 'none') {
        books = books.filter(currentBook => {
          if (currentBook.id !== book.id) {
            return currentBook;
          }
        });
      }

      if (!bookIsInList) {
        book.shelf = shelf;
        books.push(book);
      }

      this.setState({ books });
      BooksAPI.update(book, shelf);
    }
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              books={this.state.books}
              onUpdateBookCategory={this.updateBookCategory}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <ListBook
              books={this.state.books}
              onUpdateBookCategory={this.updateBookCategory}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
