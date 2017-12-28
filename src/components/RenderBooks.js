import React from 'react';
import PropTypes from 'prop-types';

const RenderBooks = ({ id, section, books, onMoveBook }) => {
  return (
    <div className='bookshelf' id={id}>
      <h2 className='bookshelf-title'>{section}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {books.map(book => {
            return (
              <li key={book.id} className='book'>
                <div className='book-shelf-changer'>
                  <select
                    value={book.shelf}
                    onChange={event => onMoveBook(book, event.target.value)}
                  >
                    <option value='default' disabled>
                      Move to...
                    </option>
                    <option value='currentlyReading'>Currently Reading</option>
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
                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                      }}
                    />
                  </a>
                </div>
                <div className='book-info'>
                  <div>
                    <div className='book-title'>{book.title}</div>
                    <div className='book-authors'>
                      by {book.authors ? book.authors.join(', ') : 'No Author'}
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
  );
}

RenderBooks.propTypes = {
  id: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired
};

export default RenderBooks;
