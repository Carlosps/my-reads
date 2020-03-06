import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class Search extends Component {
  state = {
    query: '',
    booksSearch: [],
    searching: false
  };

  searchBooks = debounce(query => {
    this.setState({ query });
    this.setState({ searching: true });
    this.setState({ booksSearch: [] });

    if (query) {
      BooksAPI.search(query)
        .then(booksSearch => {
          this.setState({ searching: false });
          if (booksSearch[0] && query === this.state.query) {
            this.setCorrespondentShelf(booksSearch);
            this.setState({ booksSearch });
          } else {
            this.setState({ booksSearch: [] });
          }
        })
        .catch(error => {
          this.setState({ searching: false });
          this.setState({ booksSearch: [] });
        });
    } else {
      this.setState({ searching: false });
      this.setState({ booksSearch: [] });
    }
  }, 400);

  setCorrespondentShelf(booksSearch) {
    let booksSearchShelf = [];
    const { books } = this.props;

    for (const bookSearch of booksSearch) {
      for (const book of books) {
        if (book.id === bookSearch.id) {
          bookSearch.shelf = book.shelf;
        }
      }
      booksSearchShelf.push(bookSearch);
    }
    this.setState({ booksSearch: booksSearchShelf });
  }

  render() {
    const { booksSearch, query, searching } = this.state;
    const { onUpdateBookCategory } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksSearch.map(book => (
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
                        value={book.shelf ? book.shelf : 'none'}
                        onChange={value => onUpdateBookCategory(value, book)}
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        {booksSearch.length === 0 && query !== '' && searching && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
        {booksSearch.length === 0 && query !== '' && !searching && (
          <div className="loader-container">
            <span className="no-results-found">No results found</span>
          </div>
        )}
      </div>
    );
  }
}

export default Search;

export const debounce = (func, wait) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      func.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
