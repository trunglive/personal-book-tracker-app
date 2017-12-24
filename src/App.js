import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CurrentlyReading from './components/CurrentlyReading'
import WantToRead from './components/WantToRead'
import Read from './components/Read'
import SearchBook from './SearchBook'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({
          currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
          wantToRead: books.filter(book => book.shelf === 'wantToRead'),
          read: books.filter(book => book.shelf === 'read')
        }))
      })
  }

  moveBook = (book, shelf) => {
    if (shelf === 'currentlyReading') {
      this.setState(state => ({
        wantToRead: state.wantToRead.filter(b => b.id !== book.id),
        read: state.read.filter(b => b.id !== book.id)
      }))
      this.setState(state => ({
        currentlyReading: state.currentlyReading.concat([ book ])
      }))
      BooksAPI.update(book, shelf)
    }

    if (shelf === 'wantToRead') {
      this.setState(state => ({
        currentlyReading: state.currentlyReading.filter(b => b.id !== book.id),
        read: state.read.filter(b => b.id !== book.id)
      }))
      this.setState(state => ({
        wantToRead: state.wantToRead.concat([ book ])
      }))
      BooksAPI.update(book, shelf)
    }

    if (shelf === 'read') {
      this.setState(state => ({
        currentlyReading: state.currentlyReading.filter(b => b.id !== book.id),
        wantToRead: state.wantToRead.filter(b => b.id !== book.id)
      }))
      this.setState(state => ({
        read: state.read.concat([ book ])
      }))
      BooksAPI.update(book, shelf)
    }
  }

  render() {
    
    // console.log(BooksAPI.search('Astronomy'));
    // console.log(BooksAPI.get('evuwdDLfAyYC'));
    // console.log(this.state.read);
    // console.log(this.state.wantToRead);
    // console.log(this.state.currentlyReading);

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <CurrentlyReading books={this.state.currentlyReading} onMoveBook={this.moveBook} />
                  <WantToRead books={this.state.wantToRead} onMoveBook={this.moveBook} />
                  <Read books={this.state.read} onMoveBook={this.moveBook} />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
        )}/>

        <Route path="/search" render={() => (
          <SearchBook onMoveBook={this.moveBook} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
