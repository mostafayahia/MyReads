import React from 'react';
import * as BooksAPI from './utils/BooksAPI';
import './App.css';
import AppHeader from './AppHeader';
import BookShelf from './BookShelf';

const CATEGORY_CURRENTLY_READING = 'currentlyreading';
const CATEGORY_WANT_TO_READ = 'wanttoread';
const CATEGORY_READ = 'read';

class BooksApp extends React.Component {
  categories = [
    CATEGORY_CURRENTLY_READING,
    CATEGORY_WANT_TO_READ,
    CATEGORY_READ
  ];

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    booksPerShelf: this.initBooksPerShelf()
  };

  initBooksPerShelf() {
    const booksPerShelf = {};
    this.categories.map(c => booksPerShelf[c] = []);
    return booksPerShelf;
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        console.dir(books);
        books.map(book => {
          const shelf = book.shelf.toLowerCase();
          if (!this.categories.includes(shelf))
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
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <AppHeader headerText='MyReads' />
              <div className="list-books-content">
                <BookShelf title='Currently Reading' books={this.state.booksPerShelf[CATEGORY_CURRENTLY_READING]} />
                <BookShelf title='Want to Read' books={this.state.booksPerShelf[CATEGORY_WANT_TO_READ]} />
                <BookShelf title='Read' books={this.state.booksPerShelf[CATEGORY_READ]} />
              </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
