import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ShowShelf from './ShowShelf'
import PropTypes from 'prop-types'

class showBookshelves extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    shelfContents: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }
  render() {
    const { books, shelfContents, shelves, onChangeShelf } = this.props
    return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <ShowShelf
              books={books}
              shelf={shelf}
              shelfContents={shelfContents}
              shelves={shelves}
              onChangeShelf={onChangeShelf}
              key={shelf.id}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link
          to='/search'
        >Add a book</Link>
      </div>
      </div>
    )
  }
}

export default showBookshelves