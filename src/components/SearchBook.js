import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI';

class SearchBook extends Component {
  static propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      books: null
    };
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.onSearch(this.state.search);
  }

  onSearch(terms) {
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
          <Link className='close-search' to='/'>
            Close
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              value={search}
              onChange={event => this.onSearch(event.target.value)}
            />
          </div>
        </div>

        {!books ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : (
          <div className='search-books-results'>
            <ol className='books-grid'>
              {books.map(book => {
                return (
                  <li key={book.id}>
                    <div className='book'>
                      <div className='book-top'>
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
                      </div>
                      <div className='book-title'>{book.title}</div>
                      <div className='book-authors'>
                        {book.authors ? book.authors.join(', ') : 'No Author'}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    );
  }
}

export default SearchBook;
