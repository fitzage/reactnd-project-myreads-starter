import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    shelves: PropTypes.array.isRequired,
    shelfContents: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }
  render() {
    const { books, shelf, shelves, shelfContents, onChangeShelf } = this.props
    const currentShelf = shelfContents[shelf]
    return (
      <ol className="books-grid">
      {books.filter(book => currentShelf.includes(book.id)).map((book) => (
        <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
            {/*
              TODO: Update this so that select list updates when book is moved
              TODO: Make sure None value is working correctly
            */}
              <select defaultValue={book.shelf} onChange={(e) => onChangeShelf(book,e.target.value)}>
                <option value="none" disabled>Move to...</option>
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
      ))}
      </ol>
    )
  }
}

export default ListBooks