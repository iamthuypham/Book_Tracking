import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ShelfListBooks from './ShelfListBooks'
import './App.css'

const ListBooks = ({books, onBookShelfChange}) => {
	// create list of books for each shelf
	let currentlyReadingList = [], wantToReadList = [], readList = []
	for (const book of Array.from(books)) {
		if (book.shelf === 'currentlyReading') {
			currentlyReadingList.push(book)
		} else if (book.shelf === 'wantToRead') {
			wantToReadList.push(book)
		} else {
			readList.push(book)
		}
	}
    
	return (
		<div className='list-books'>
			<div className='list-books-title'>
				<h1>Book Tracker</h1>
			</div>
			<div className='list-books-content'>
				<ShelfListBooks shelfListBooks={currentlyReadingList} shelfName='Currently Reading' onBookShelfChange={onBookShelfChange}/>
				<ShelfListBooks shelfListBooks={wantToReadList} shelfName='Want To Read' onBookShelfChange={onBookShelfChange}/>
				<ShelfListBooks shelfListBooks={readList} shelfName='Read' onBookShelfChange={onBookShelfChange}/>
			</div>
			<div className='open-search'>
				<Link to='/search'>Add a book</Link>
			</div>
		</div>
	)
}

ListBooks.propTypes = {
	books: PropTypes.array,
	onBookShelfChange: PropTypes.func
}

export default ListBooks
