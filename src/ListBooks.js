import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  renderThumbnail = (book) => {
    // Check if book contains imageLinks, and return the thumbnail URL if it does.
    if (book.imageLinks) {
      return book.imageLinks.thumbnail
    }
  }

  isOnShelf = (book) => {
    // Check if the book showing is currently on a shelf. Not completely necessary for main view, but avoids having to build a different view for search.
    let currentShelf = ''
    for (var shelf in this.props.shelfContents) {
      // Loops through current shelf contents state and checks current book against those shelves.
      if (this.props.shelfContents[shelf].indexOf(book.id) !== -1) {
        currentShelf = shelf
      }
    }
    (currentShelf === '' ? currentShelf = "none": '')
    return currentShelf
  }

  render() {
    const { book, shelves, onChangeShelf } = this.props
    return (
      <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.renderThumbnail(book)})` }}></div>
          <div className="book-shelf-changer">
            <select defaultValue={this.isOnShelf(book)} onChange={(e) => onChangeShelf(book,e.target.value)}>
              <option value="" disabled>Move to...</option>
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
    )
  }
}

export default ListBooks