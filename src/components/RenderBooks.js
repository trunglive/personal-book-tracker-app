import React from 'react';
import PropTypes from 'prop-types';

function RenderBooks({ section, booksOnShelf, onMoveBook }) {
  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{section}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {booksOnShelf.map(book => {
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
                          backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}
                      />
                    </a>

                    <div className='book-shelf-changer'>
                      <select
                        value={book.shelf}
                        onChange={event => onMoveBook(book, event.target.value)}
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
    </div>
  );
}

RenderBooks.propTypes = {
  section: PropTypes.string.isRequired,
  booksOnShelf: PropTypes.array.isRequired,
  onMoveBook: PropTypes.func.isRequired
};

export default RenderBooks;
