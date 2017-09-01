import React, { Component } from 'react';
import PropTypes from 'prop-types'
import 'css-star-rating/dist/css/star-rating.css'

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
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks? book.imageLinks.smallThumbnail : '' })` }}>
            </div>
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
          <a href={book.previewLink} target="_blank">
            {/* star-rating package requires value-x to be whole number */}
            <div className={`rating star-icon small color-negative value-${Math.floor(book.averageRating)} half theme-google-places`}>
              <div className="star-container">
                { [...Array(5).keys()].map(n => {
                  return (
                    <div key={n} className="star">
                      <i className="star-empty"></i>
                      <i className="star-half"></i>
                      <i className="star-filled"></i>
                    </div>
                  )
                })}
              </div>
            </div>
          </a>
        </div>
      </li>
    )
  }
}

export default Book
