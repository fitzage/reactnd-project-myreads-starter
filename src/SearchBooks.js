import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

/**
 * TODO: Flesh out this comment some more
 * @description Searches API for books
 * @constructor
 * @param {string} query - Search term
*/
class SearchBooks extends Component {
  state= {
    query: '',
    bookSearch: []
  }

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    if(!query || query.constructor !== String || query === '') {
      this.setState({bookSearch: []})
    } else {
      BooksAPI.search(query).then((books) => {
        if (!books.error) {
          this.setState({bookSearch: books})
        } else {
          this.setState({bookSearch: []})
        }
      })
    }
  }

  render() {
    const { shelves, onChangeShelf, shelfContents } = this.props
    const { query, bookSearch } = this.state

    let renderBooks
    if (query && bookSearch.length !== 0) {
      renderBooks =
        bookSearch.map((book) =>(
        <ListBooks
          book={book}
          shelves={shelves}
          shelfContents={shelfContents}
          onChangeShelf={onChangeShelf}
          key={book.id}
        />
      ))
    } else if (query) {
      renderBooks = <div>No Results</div>
    }

    return (
      <div className="search-books">
      <div className="search-books-bar">
        <Link
          className="close-search"
          to="/"
          >Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {renderBooks}
        </ol>
      </div>
      </div>
    )
  }
}

export default SearchBooks