import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooksContent   from './ListBooksContent'
import './App.css'

class BooksApp extends React.Component {
   constructor(props) {
    super(props);
    this.state = { 
      books: [],
      showSearchPage: true };
    this.moveBook = this.moveBook.bind(this);
  }
  
  moveBook(updatedBook, e) {
    e.preventDefault()
    const newShelf = e.target.value
    // update the book from database
    BooksAPI.update(updatedBook, newShelf)
    // update the state of books
    this.setState(prevState => {
      // find the book, from prevState books list, that user want to move
      for (const bookFromPrevState of Array.from(prevState["books"])) {
        if (bookFromPrevState.id == updatedBook.id) {
          // change shelf value of the book, from prevState books list
          bookFromPrevState.shelf = newShelf
        }
      }
    })
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(this.state.books)
    })
  }

  render() {
    const { books } = this.state
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
                      book.shelf == "currentlyReading" &&
                        <ListBooksContent key={book.id} bookOfCurrentShelf={book} onChange={this.moveBook}/>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want To Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    { books.map((book) => (
                      book.shelf == "wantToRead" &&
                        <ListBooksContent key={book.id} bookOfCurrentShelf={book} onChange={this.moveBook}/>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    { books.map((book) => (
                      book.shelf == "read" &&
                        <ListBooksContent key={book.id} bookOfCurrentShelf={book} onChange={this.moveBook}/>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
