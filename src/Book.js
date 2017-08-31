import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

class Book extends Component {
  static propTypes = {
    bookOfCurrentShelf: PropTypes.object.isRequired
  }
  render() {
    const book = this.props.bookOfCurrentShelf
    return (
      <li>
        <div className="book" >
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks? book.imageLinks.smallThumbnail : '' })` }}></div>
              <div className="book-shelf-changer">
                <select value={book.shelf? book.shelf:'none'} onChange={(e)=>this.props.onChange(book, e)}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }
}

export default Book
