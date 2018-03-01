import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShowBookshelf from './ShowBookshelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: [
      { id: 'currentlyReading', title: 'Currently Reading' },
      { id: 'wantToRead', title: 'Want to Read' },
      { id: 'read', title: 'Read' }
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <ShowBookshelf
            books={this.state.books}
            shelves={this.state.shelves}
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
