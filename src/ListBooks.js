import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class ListBook extends Component {
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
      const books = this.state.books.map(currentBook => {
        if (book.id === currentBook.id) {
          currentBook.shelf = shelf;
        }
        return currentBook;
      });

      this.setState({ books });
      BooksAPI.update(book, shelf);
    }
  }

  render() {
    const { books } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>

              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map(
                    book =>
                      book.shelf === 'currentlyReading' && (
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              {book.imageLinks && (
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage:
                                      'url(' + book.imageLinks.thumbnail + ')'
                                  }}
                                />
                              )}
                              <div className="book-shelf-changer">
                                <select
                                  value={book.shelf}
                                  onChange={value =>
                                    this.updateBookCategory(value, book)
                                  }
                                >
                                  <option value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">
                                    Currently Reading
                                  </option>
                                  <option value="wantToRead">
                                    Want to Read
                                  </option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                      )
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>

              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map(
                    book =>
                      book.shelf === 'wantToRead' && (
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              {book.imageLinks && (
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage:
                                      'url(' + book.imageLinks.thumbnail + ')'
                                  }}
                                />
                              )}
                              <div className="book-shelf-changer">
                                <select
                                  value={book.shelf}
                                  onChange={value =>
                                    this.updateBookCategory(value, book)
                                  }
                                >
                                  <option value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">
                                    Currently Reading
                                  </option>
                                  <option value="wantToRead">
                                    Want to Read
                                  </option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                      )
                  )}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map(
                    book =>
                      book.shelf === 'read' && (
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                              {book.imageLinks && (
                                <div
                                  className="book-cover"
                                  style={{
                                    width: 128,
                                    height: 192,
                                    backgroundImage:
                                      'url(' + book.imageLinks.thumbnail + ')'
                                  }}
                                />
                              )}
                              <div className="book-shelf-changer">
                                <select
                                  value={book.shelf}
                                  onChange={value =>
                                    this.updateBookCategory(value, book)
                                  }
                                >
                                  <option value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">
                                    Currently Reading
                                  </option>
                                  <option value="wantToRead">
                                    Want to Read
                                  </option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                      )
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button onClick={() => this.setState({ showSearchPage: true })}>
              Add a book
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListBook;
