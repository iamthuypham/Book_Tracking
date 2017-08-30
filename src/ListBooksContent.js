import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

class ListBooksContent extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
  }

  render() {
    const { shelf, books } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ shelf }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { books.map((book) => (
              <div className="book" key={book.id}>
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                <div className="book-title">{book.title}</div>
                { book.authors.map((author) => (
                  <div className="book-authors" key={author}>{author}</div>
                ))}
              </div>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ListBooksContent
