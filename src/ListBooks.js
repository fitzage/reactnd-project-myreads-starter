import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBook from './ListBook'

class ListBooks extends Component {
  render() {
    const { books } = this.props
    return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                <li>
                {books.map((book) => (
                  <ListBook
                    book={book}
                  />
                ))}
                </li>
              </ol>
            </div>
          </div>
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

export default ListBooks