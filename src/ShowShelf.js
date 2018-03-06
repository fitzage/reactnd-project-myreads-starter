import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

/**
 * @description Renders a single bookshelf
 * @constructor
 * @param {array} books - Array of all books on user's bookshelves
 * @param {object} shelf - Current shelf being rendered
 * @param {array} shelves - Array of available bookshelves
 * @param {object} shelfContents - Shelves with books currently contained on shelves
 * @param {function} onChangeShelf - Function that moves books between shelves
*/
class ShowShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    shelfContents: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }
  render() {
    const { books, shelf, shelves, shelfContents, onChangeShelf } = this.props
    const currentShelf = shelfContents[shelf.id]
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {/* Map through array of books on this shelf and render ListBooks component for each */}
          {books.filter(book => currentShelf.includes(book.id)).map((book) => (
            <ListBooks
              book={book}
              shelves={shelves}
              shelfContents={shelfContents}
              onChangeShelf={onChangeShelf}
              key={book.id}
            />
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ShowShelf