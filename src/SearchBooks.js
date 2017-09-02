import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { CSSTransitionGroup } from 'react-transition-group'

import * as BooksAPI from './BooksAPI'
import Book   from './Book'
import './App.css'

class SearchBooks extends React.Component {
	constructor(props) {
		super(props)
		this.state = 
				{ 
					searchBooks:[],
					query: '',
					resultMessage: '+10,000 free books.'
				}
	}
  
	/**
  * @description Update query as long as users input
  * @param {string} query
  */
	updateQuery(query) {
		this.setState({ query: query.trim() })
		if (query) {
			BooksAPI.search(query.trim(), 10).then((books) => {
				// empty query or books = []
				if (books['error'] || !books) {
					this.setState({ resultMessage : 'Oh no! There is no result matching your search. Please try again.' })
					// found some matches
				} else {
					this.setState({ searchBooks : books, resultMessage: null}) 
				}
			})
			// users backspace to empty query
		} else {
			this.setState({ resultMessage : 'Cannot find what you want? +100 books are added every month. Email us.' })
		}
	}

	render() {
		const { searchBooks, query, resultMessage } = this.state
    
		// detect if books from search result already on shelf, then set the book shelf
		searchBooks.filter(searchBook => this.props.books.some(bookOnShelf => {
			if (searchBook.id === bookOnShelf.id) {
				searchBook.shelf = bookOnShelf.shelf 
			}
		}))
		return (
			<div className='search-books'>
				<div className='search-books-bar'>
					<Link to='/' className='close-search'>Close</Link>
					<div className='search-books-input-wrapper'>
						<input type='text' 
							placeholder='Search by title or author'
							value={query}
							onChange={(event) => this.updateQuery(event.target.value)}/>
					</div>
				</div>
        
				{ resultMessage ? ( 
            
					<div className='search-result-message'>{ resultMessage }</div> 
            
				) : (
					<div className='search-books-results'>  
						<CSSTransitionGroup
							className='books-grid'
							transitionName='fadeBook'
							transitionEnterTimeout={600}
							transitionLeaveTimeout={300}>
							{ searchBooks.map((book) => (
								<Book key={book.id} book={book} onBookShelfChange={this.props.onBookShelfChange}/>
							))}
						</CSSTransitionGroup>
					</div>  
				)}
			</div>
		)
	}
}

SearchBooks.propTypes = {
	books: PropTypes.array.isRequired,
	onBookShelfChange: PropTypes.func
}

export default SearchBooks
