import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import RenderBooks from './components/RenderBooks';
import SearchBook from './components/SearchBook';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';

class BooksApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
    this.moveBook = this.moveBook.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  moveBook = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;

        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }));
      });
    }
  };

  render() {
    const { books } = this.state;
    const currentlyReading = books.filter(
      book => book.shelf === 'currentlyReading'
    );
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const read = books.filter(book => book.shelf === 'read');

    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <div className='list-books'>
              <div className='list-books-title'>
                <p className='list-books-title-main'>Book Lending App</p>
                <p className='list-books-title-sub'>
                  Keep track of your favorite books
                </p>
                <a href='#available-books'>
                  <span className='ion-ios-arrow-down'/>
                </a>
              </div>
              <img
                className='book-image'
                src={require('./images/books.jpg')}
                alt='book'
              />
              <div className='list-books-content'>
                <div>
                  <RenderBooks
                    section='Currently Reading'
                    books={currentlyReading}
                    onMoveBook={this.moveBook}
                  />
                  <RenderBooks
                    section='Want To Read'
                    books={wantToRead}
                    onMoveBook={this.moveBook}
                  />
                  <RenderBooks
                    section='Read'
                    books={read}
                    onMoveBook={this.moveBook}
                  />
                </div>
              </div>
              <div className='open-search'>
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}
        />

        <Route
          path='/search'
          render={() => (
            <SearchBook booksOnShelf={books} onMoveBook={this.moveBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
