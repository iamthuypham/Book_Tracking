import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'

import Book from './Book'
import sortBy from 'sort-by'
import './App.css'

const ShelfListBooks = ({shelfListBooks, shelfName, onBookShelfChange}) => {
  
	shelfListBooks.sort(sortBy('title'))
	return (
		<div className='bookshelf'>
			<h2 className='bookshelf-title'>{shelfName}</h2>
			<div className='bookshelf-books'>
				<CSSTransitionGroup
					className='books-grid'
					transitionName='fadeBook'
					transitionEnterTimeout={600}
					transitionLeaveTimeout={500}>
					{ shelfListBooks.map((book) => (
						<Book key={book.id} book={book} onBookShelfChange={onBookShelfChange}/>
					))}
				</CSSTransitionGroup>
			</div>
		</div>
	)
}

ShelfListBooks.propTypes = {
	shelfListBooks: PropTypes.array.isRequired,
	shelfName: PropTypes.string.isRequired,
	onBookShelfChange: PropTypes.func
}

export default ShelfListBooks
