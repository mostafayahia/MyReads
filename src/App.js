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
    booksPerShelf: this.initBooksPerShelf()
  };

  initBooksPerShelf() {
    const booksPerShelf = {};
    categories.keys.map(k => booksPerShelf[k] = []);
    return booksPerShelf;
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        books.forEach(book => {
          // categories keys all in lower case so you have to 
          // convert to lower case for comparison
          const shelf = book.shelf.toLowerCase();

          if (!categories.keys.includes(shelf))
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

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <div className="list-books">
            <AppHeader headerText='MyReads' />
            <div className="list-books-content">
              {categories.keys.map((key, index) => (
                <BookShelf key={index} title={categories.labels[index]} books={this.state.booksPerShelf[key]} />
              ))}
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
        <Route path="/search" component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
