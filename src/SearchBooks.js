import React, { Component } from 'react';
import SearchBookList from './SearchBookList';
import { Link } from 'react-router-dom';
import * as categories from './categories';

class SearchBooks extends Component {
    state = {
        searchTerm: '',
    }

    inputChangeHandler = event => {
        const { value } = event.target;
        this.setState(() => ({ searchTerm: value }));
    }

    addShelfToBooks(books) {
        const { booksPerShelf } = this.props;
        if (!books || !books.length) {
            return;
        }

        books.forEach(book => {
            categories.values.forEach(v => {
                if (booksPerShelf[v].filter(book2 => book2.id === book.id)[0]) {
                    book.shelf = v;
                }
            })
            book.shelf = book.shelf || categories.NO_CATEGORY_VAL;
        })
    }


    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
  
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                        <input type="text"
                            placeholder="Search by title or author"
                            value={this.state.searchTerm}
                            onChange={this.inputChangeHandler} />

                    </div>
                </div>
                <SearchBookList addShelfToBooks={books => this.addShelfToBooks(books)}
                    searchTerm={this.state.searchTerm} onShelfChange={this.props.onShelfChange} />
            </div>
        );
    }
}

export default SearchBooks;