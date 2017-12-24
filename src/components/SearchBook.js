import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../utils/BooksAPI'

class SearchBook extends Component {
	static propTypes = {
    onMoveBook: PropTypes.func.isRequired
	}

	state = {
		search: '',
		books: null,
		shelf: 'none'
	}

	componentDidMount() {
		this.onSearch(this.state.search)
	}

	onSearch(terms) {
		this.setState(() => ({
			search: terms,
			books: null
		}))

		BooksAPI.search(terms)
			.then(result => {
				this.setState(() => ({
					books: result
				}))
			})
	}

	render() {
		const { onMoveBook } = this.props
		const { search, books, shelf } = this.state

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text"
							placeholder="Search by title or author"
							value={search}
							onChange={event => this.onSearch(event.target.value)}
						/>
					</div>
				</div>

				{!books
					? <p style={{textAlign: 'center'}}>Loading...</p>
					: <div className="search-books-results">
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
															onChange={(event) => {
																if (event.target.value !== shelf) {
																	onMoveBook(book, event.target.value)
																}
															}}>
															<option value="moveTo" disabled>Move to...</option>
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
						</div>}
			</div>
		)
	}
}

export default SearchBook