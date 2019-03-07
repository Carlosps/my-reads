import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListBook extends Component {
  render() {
    const { books, onUpdateBookCategory } = this.props;
    
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
                                    onUpdateBookCategory(value, book)
                                  }
                                >
                                  <option value="move" disabled>
                                    Move to...
                                  </option>
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
                                    onUpdateBookCategory(value, book)
                                  }
                                >
                                  <option value="move" disabled>
                                    Move to...
                                  </option>
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
                                    onUpdateBookCategory(value, book)
                                  }
                                >
                                  <option value="move" disabled>
                                    Move to...
                                  </option>
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
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ListBook;
