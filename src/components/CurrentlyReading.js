import React, { Component } from 'react'
import PropTypes from 'prop-types'

class currentlyReading extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveBook: PropTypes.func.isRequired
  }

  state = {
    shelf: 'currentlyReading'
  }

  render() {
    const { books, onMoveBook } = this.props
    const { shelf } = this.state

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => {
              return (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <a href={book.canonicalVolumeLink} target="_blank">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                      </a>
                      
                      <div className="book-shelf-changer">
                        <select value={shelf}
                          onChange={(event) => event.target.value !== shelf ? onMoveBook(book, event.target.value) : event.target.value}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors ? book.authors.join(', ') : 'No Author'}</div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default currentlyReading

