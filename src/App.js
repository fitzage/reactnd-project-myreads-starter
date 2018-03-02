import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShowBookshelves from './ShowBookshelves'
import SearchBooks from './SearchBooks'

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
          <SearchBooks />
        )}/>
      </div>
    )
  }
}

export default BooksApp
