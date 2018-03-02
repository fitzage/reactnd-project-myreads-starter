import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import PropTypes from 'prop-types'

class showBookshelf extends Component {
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
          <div className="bookshelf" key={shelf.id}>
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
              <ListBooks
                books={books}
                shelf={shelf.id}
                shelfContents={shelfContents}
                shelves={shelves}
                onChangeShelf={onChangeShelf}
              />
            </div>
          </div>
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

export default showBookshelf