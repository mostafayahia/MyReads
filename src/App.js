import React from 'react';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';
import AppHeader from './AppHeader';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';
import * as categories from './categories'
import { Route, Link } from 'react-router-dom';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO==: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    allBooks: [],
    updatedBook: {}
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => this.setState(() => ({ allBooks: books })));
  }

  componentDidUpdate(prevProp, prevState) {
    if (JSON.stringify(prevState.updatedBook) !== JSON.stringify(this.state.updatedBook)) {
      BooksAPI.update(this.state.updatedBook, this.state.updatedBook.shelf);
    }
  }

  moveBookToShelf(book, shelf) {
    this.setState(prevState => {
      const updatedBooks = this.isBookInAllBooks(book, prevState) ?
        [...prevState.allBooks] : prevState.allBooks.concat({ ...book });
      updatedBooks.filter(b => b.id === book.id)[0].shelf = shelf;
      return {
        allBooks: updatedBooks,
        updatedBook: {
          id: book.id,
          shelf
        }
      };
    });
  }

  isBookInAllBooks(book, state) {
    return Boolean(state.allBooks.filter(b => b.id === book.id)[0]);
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <div className="list-books">
            <AppHeader headerText='MyReads' />
            <div className="list-books-content">
              {categories.values.map((val, index) => (
                <BookShelf key={index} title={categories.labels[index]}
                  onShelfChange={(book, shelf) => this.moveBookToShelf(book, shelf)}
                  books={this.state.allBooks.filter(b => b.shelf === val)} />
              ))}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => <SearchBooks allBooks={this.state.allBooks}
          onShelfChange={(book, shelf) => this.moveBookToShelf(book, shelf)} />} />
      </div>
    )
  }
}

export default BooksApp
