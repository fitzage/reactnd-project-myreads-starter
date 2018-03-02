import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

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
          {books.filter(book => currentShelf.includes(book.id)).map((book) => (
            <ListBooks
              book={book}
              shelves={shelves}
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