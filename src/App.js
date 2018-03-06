import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShowBookshelves from './ShowBookshelves'
import SearchBooks from './SearchBooks'

/**
 * @description Pulls initial data from API and then renders ShowBookshelves component if route is '/', renders SearchBooks component if route is '/search'
 * @constructor
*/
class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: [
      { id: 'currentlyReading', title: 'Currently Reading' },
      { id: 'wantToRead', title: 'Want to Read' },
      { id: 'read', title: 'Read' }
    ],
    shelfContents: {
    }
  }

  /**
    * @description When component mounts, pull list of books on shelves from API
    * @returns {array} books - Sets state for books array with result of API call
    * @returns {object} shelfContents - Sets state with object containing available shelves and IDs of books on each shelf. Using object instead of array because that's what the API returns for this in updateShelf.
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      // Takes shelf and book state and builds initial shelfContents state
      let shelfContents = {}
      this.state.shelves.map(shelf => {
        const result = books.filter(book => book.shelf === shelf.id);
        const shelfRow = result.map(book => book.id)
        shelfContents[shelf.id] = shelfRow
      })
      this.setState({ books, shelfContents })
    })
  }

  /**
    * @description Calls API to update which shelf a book is on, uses returned data to update state, updates books array with new book data
    * @param {object} book - Book to be updated
    * @param {string} shelf - Shelf to move book to
    * @returns {array} books - Sets state with new books array
    * @returns {object} shelfContents - Sets state with updated object with current shelves and book IDs for each shelf
  */
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((shelfContents) => {
      const books = this.state.books.filter(obj => (obj.id !== book.id))
      book.shelf = shelf
      books.push(book)
      this.setState({ shelfContents, books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <ShowBookshelves
            books={this.state.books}
            shelves={this.state.shelves}
            shelfContents={this.state.shelfContents}
            onChangeShelf={this.updateShelf}
          />
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            shelves={this.state.shelves}
            shelfContents={this.state.shelfContents}
            onChangeShelf={this.updateShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
