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
    booksPerShelf: this.initBooksPerShelf(),
    updatedBookId: '',
    updatedShelf: ''
  };

  initBooksPerShelf() {
    const booksPerShelf = {};
    categories.values.map(k => booksPerShelf[k] = []);
    return booksPerShelf;
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        books.forEach(book => {
          const shelf = book.shelf;

          if (!categories.values.includes(shelf))
            return;

          this.setState(prevState => ({
            booksPerShelf: {
              ...prevState.booksPerShelf,
              [shelf]: prevState.booksPerShelf[shelf].concat([book])
            }
          }))
        })
      });
  }

  componentDidUpdate(prevProp, prevState) {
    if (prevState.updatedBookId !== this.state.updatedBookId || 
      prevState.updatedShelf !== this.state.updatedShelf) {
        BooksAPI.update({ id: this.state.updatedBookId }, this.state.updatedShelf);
    }
  }

  moveBookToShelf(book, shelf) {
    this.removeBookFromShelfs(book);

    if (shelf !== categories.NO_CATEGORY_VAL) {
      book = { ...book, shelf };
      this.setState(prevState => ({
        booksPerShelf: {
          ...prevState.booksPerShelf,
          [shelf]: prevState.booksPerShelf[shelf].concat([book])
        }
      }));
    }

    this.setState(() => ({
      updatedBookId: book.id,
      updatedShelf: shelf
    }));
  }

  removeBookFromShelfs(book) {
    categories.values.forEach(v => this.setState(prevState => ({
      booksPerShelf: {
        ...prevState.booksPerShelf,
        [v]: prevState.booksPerShelf[v].filter(b => b.id !== book.id)
      }
    })));
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
                  books={this.state.booksPerShelf[val]} />
              ))}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => <SearchBooks booksPerShelf={this.state.booksPerShelf}
          onShelfChange={(book, shelf) => this.moveBookToShelf(book, shelf)} />} />
      </div>
    )
  }
}

export default BooksApp
