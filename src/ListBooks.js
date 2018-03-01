import React, { Component } from 'react'

class ListBooks extends Component {
  render() {
    const { books, shelf, shelves } = this.props
    return (
      <ol className="books-grid">
      {books.filter(book => book.shelf === shelf).map((book) => (
        <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select>
                <option value="none" disabled>Move to...</option>
                {shelves.map((shelf) => (
                  <option value="{shelf.id}">{shelf.title}</option>
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