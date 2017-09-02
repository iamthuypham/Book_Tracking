import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
	constructor(props) {
		super(props)
		this.state = 
				{ 
					books: []
				}
		this.handleBookShelfChange = this.handleBookShelfChange.bind(this)
	}
  
	/**
  * @description Move a book
  * @param {object} movingBook
  * @param {object} e
  */
	handleBookShelfChange(movingBook, e) {
		e.preventDefault()
		const newShelf = e.target.value
		// update the book backend
		BooksAPI.update(movingBook, newShelf)
    
		let newListBooks = this.state.books
		// if users move a new book to shelf
		if (!movingBook.shelf) {
			newListBooks.push(movingBook)
		}
		// if users remove a book from shelf
		if (newShelf==='none'){
			newListBooks = newListBooks.filter(function(book) {
				return book.id !== movingBook.id
			})
		}
		// if users move a book between shelves
		for (const book of Array.from(newListBooks)) {
			if (book.id === movingBook.id) {
				book.shelf = newShelf
			}
		}
		this.setState({ books: newListBooks})
	}
  
	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState({ books })
		})
	}

	render() {
		const { books } = this.state
		return (
			<BrowserRouter>
				<div className='app'>
					<Route exact path='/' render={() => (
						<ListBooks
							books={books}
							onBookShelfChange={this.handleBookShelfChange}
						/>
					)}/>
          
					<Route path='/search' render={() => (
						<SearchBooks 
							books={books}
							onBookShelfChange={this.handleBookShelfChange} />
					)}/>
				</div>
			</BrowserRouter>
		)
	}
}

export default BooksApp
