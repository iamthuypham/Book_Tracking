import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book   from './Book'
import sortBy from 'sort-by'
import './App.css'

class BooksApp extends React.Component {
   constructor(props) {
    super(props);
    this.state = 
    { 
      books: [],
      query: '',
      resultMessage: '+10,000 free books.'
    }
    this.moveBook = this.moveBook.bind(this);
  }
  
  moveBook = (updatedBook, e) => {
    e.preventDefault()
    const newShelf = e.target.value
    // update the book from database
    BooksAPI.update(updatedBook, newShelf)
    // update the state of books
    this.setState(prevState => {
      // find the book, from prevState books list, that user want to move
      for (const bookFromPrevState of Array.from(prevState['books'])) {
        if (bookFromPrevState.id === updatedBook.id) {
          // change shelf value of the book, from prevState books list
          bookFromPrevState.shelf = newShelf
        }
      }
    })
  }
  
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    if (query) {
      BooksAPI.search(query.trim(), 10).then((books) => {
        // empty query or books = []
        if (books['error'] || !books) {
          this.setState({ books: [], resultMessage : "Oh no! There is no result matching your search. Please try again." })
        // found some matches
        } else {
          this.setState({ books : books, resultMessage: null}) 
        }
      })
    // users backspace to empty query
    } else {
      this.setState({ resultMessage : "Cannot find what you want? +100 books are added every month. Email us." })
    }
  }
  
  // reset state books when users click Search button
  clearQuery = () => {
    this.setState({ query: '', books: [], resultMessage: '+10,000 free books.' })
  }
  
  // reset state and refresh books when users click Back App button
  refreshBooks = () => {
    this.clearQuery
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  
  componentDidMount = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
    // trigger when users click Back Browser button
    window.onpopstate = this.onBackButtonEvent
  }
  
  // refresh books when users click Back Browser button
  onBackButtonEvent = (e) => { 
    console.log('on back')
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    const { books, query, resultMessage } = this.state
    books.sort(sortBy('title'))
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>Book Tracker</h1>
            </div>
            <div className="list-books-content">
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    { books.map((book) => (
                      book.shelf === "currentlyReading" &&
                        <Book key={book.id} bookOfCurrentShelf={book} onChange={this.moveBook}/>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want To Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    { books.map((book) => (
                      book.shelf === "wantToRead" &&
                        <Book key={book.id} bookOfCurrentShelf={book} onChange={this.moveBook}/>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    { books.map((book) => (
                      book.shelf === "read" &&
                        <Book key={book.id} bookOfCurrentShelf={book} onChange={this.moveBook}/>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" onClick={this.clearQuery}>Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" onClick={this.refreshBooks}>Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" 
                      placeholder="Search by title or author"
                      value={query}
                      onChange={(event) => this.updateQuery(event.target.value)}/>
                
              </div>
            </div>
            
              { resultMessage ? ( 
                
                <div className="search-result-message">{ resultMessage }</div> 
                
              ) : (
                <div className="search-books-results">  
                  <ol className="books-grid">
                    { books.map((book) => (
                      <Book key={book.id} bookOfCurrentShelf={book} onChange={this.moveBook}/>
                    ))}
                  </ol>
                </div>  
              )}
            
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
