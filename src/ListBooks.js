import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  state = {
    onShelf: ''
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    shelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  renderThumbnail = (book) => {
    if (book.imageLinks) {
      return book.imageLinks.thumbnail
    }
  }

  isOnShelf = (book) => {
    for (var shelf in this.props.shelfContents) {
      if (this.props.shelfContents[shelf].indexOf(book.id) !== -1) {
        return shelf
      }
    }
  }

  render() {
    const { book, shelves, onChangeShelf } = this.props
    return (
      <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.renderThumbnail(book)})` }}></div>
          <div className="book-shelf-changer">
          {/*
            TODO: Make sure None value is working correctly
          */}
            <select defaultValue={this.isOnShelf(book)} onChange={(e) => onChangeShelf(book,e.target.value)}>
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
    )
  }
}

export default ListBooks