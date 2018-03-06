import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * @description Lists an individual book, with select list for moving books between shelves.
 * @constructor
 * @param {object} book - Book object to be rendered
 * @param {array} shelves - Array of available bookshelves
 * @param {object} shelfContents - Shelves with books currently contained on shelves
 * @param {function} onChangeShelf - Function that moves books between shelves
*/
class ListBooks extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    shelfContents: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  /**
    * @description Check if book contains imageLinks, and return the thumbnail URL if it does.
    * @param {object} book - Current book
    * @returns {string} book.imageLinks.thumbnail - thumbnail URL
  */
  renderThumbnail = (book) => {
    if (book.imageLinks) {
      return book.imageLinks.thumbnail
    }
  }

  /**
   * @description Check if the book showing is currently on a shelf. Not completely necessary for main view, but avoids having to build a different view for search.
   * @param {object} book - Current book
   * @param {object} shelfContents - Uses shelfContents to match search results against existing shelves
   * @returns {string} currentShelf - Returns a string indicating what shelf the book is currently on, or "none" if no shelf
  */
  isOnShelf = (book) => {
    let currentShelf = ''
    for (var shelf in this.props.shelfContents) {
      if (this.props.shelfContents[shelf].indexOf(book.id) !== -1) {
        currentShelf = shelf
      }
    }
    if (currentShelf === '') {
      currentShelf = "none"
    }
    return currentShelf
  }

  render() {
    const { book, shelves, onChangeShelf } = this.props
    return (
      <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.renderThumbnail(book)})` }}></div>
          <div className="book-shelf-changer">
            {/* Triggers isOnShelf function to choose the correct value for select list, to determine whether or not book is already on a shelf. onChange triggers moving book to new shelf. */}
            <select defaultValue={this.isOnShelf(book)} onChange={(e) => onChangeShelf(book,e.target.value)}>
              <option value="" disabled>Move to...</option>
              {/* Maps through list of shelves to dynamically build select list */}
              {shelves.map((shelf) => (
                <option value={shelf.id} key={shelf.id}>{shelf.title}</option>
              ))}
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

export default ListBooks