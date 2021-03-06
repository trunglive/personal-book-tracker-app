import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI';

class SearchBook extends Component {
  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  };

  state = {
    search: '',
    books: null
  };

  componentDidMount() {
    this.onSearch(this.state.search);
  }

  onSearch = (terms) => {
    this.setState(() => ({
      search: terms,
      books: null
    }));

    BooksAPI.search(terms).then(books => {
      const booksOnSearch = books.map(book => {
        let bookExisted = this.props.booksOnShelf.find(
          bookOnShelf => bookOnShelf.id === book.id
        );
        bookExisted && (book.shelf = bookExisted.shelf);
        return book;
      });

      this.setState({ books: booksOnSearch });
    });
  }

  render() {
    const { onMoveBook } = this.props;
    const { search, books } = this.state;
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to={`${process.env.PUBLIC_URL}/`}>
            Home
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search books by title or author'
              value={search}
              onChange={event => this.onSearch(event.target.value)}
            />
          </div>
        </div>

        {!books ? (
          <p style={{ textAlign: 'center' }} />
        ) : (
          <div className='bookshelf'>
            <div className='search-books-results'>
              <ol className='books-grid'>
                {books.map(book => {
                  return (
                    <li key={book.id} className='book'>
                      <div className='book-shelf-changer'>
                        <select
                          value={book.shelf ? book.shelf : 'default'}
                          onChange={event =>
                            onMoveBook(book, event.target.value)
                          }
                        >
                          <option value='default' disabled>
                            Move to...
                          </option>
                          <option value='currentlyReading'>
                            Currently Reading
                          </option>
                          <option value='wantToRead'>Want to Read</option>
                          <option value='read'>Read</option>
                          <option value='none'>None</option>
                        </select>
                      </div>
                      <div className='book-aside'>
                        <a href={book.canonicalVolumeLink} target='_blank'>
                          <div
                            className='book-cover'
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${
                                book.imageLinks.thumbnail
                              })`
                            }}
                          />
                        </a>
                      </div>
                      <div className='book-info'>
                        <div>
                          <div className='book-title'>{book.title}</div>
                          <div className='book-authors'>
                            by{' '}
                            {book.authors
                              ? book.authors.join(', ')
                              : 'No Author'}
                          </div>
                        </div>
                        <a
                          className='book-view'
                          href={book.canonicalVolumeLink}
                          target='_blank'
                        >
                          View Book
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SearchBook;
