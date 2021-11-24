import React, { Component } from 'react';
import BookList from './BookList';
import * as BooksAPI from './utils/BooksAPI';
import PropTypes from 'prop-types';

class SearchBookList extends Component {
    state = {
        searchBooks: []
    }

    // using componentDidUpdate is good incase fetching data whenever 
    // props change
    componentDidUpdate(prevProps) {
        const searchTerm = this.props.searchTerm.trim();

        // to avoid infinit loop we fetch data only if props change
        if (prevProps.searchTerm.trim() !== searchTerm) {
            this.fetchData(searchTerm);
        }
    }

    fetchData(searchTerm) {
        if (searchTerm) {
            BooksAPI.search(searchTerm)
                .then(books => this.updateSearchBooks(books));
        }
    }

    updateSearchBooks(booksFromAPI) {
        // if there is an error, we will clear books search result
        if (!booksFromAPI || booksFromAPI.error) {
            this.setState(() => ({ searchBooks: [] }));
            return;
        }

        this.props.addShelfToBooks(booksFromAPI);

        booksFromAPI.forEach((book, index) => {
            if (index === 0) {
                this.setState(() => ({ searchBooks: [] }));
            } else {
                this.setState(prevState => ({ searchBooks: [...prevState.searchBooks, book] }));
            }
        });

    }

    onShelfChange(book, shelf) {
        this.setState(prevState => {
            const updatedBooks = [...prevState.searchBooks];
            updatedBooks.filter(b => b.id === book.id)[0].shelf = shelf;

            return { searchBooks: updatedBooks };
        });

        this.props.onShelfChange(book, shelf);
    }

    render() {
        return this.props.searchTerm ? <div className="search-books-grid">
            <BookList books={this.state.searchBooks} onShelfChange={(book, shelf) => this.onShelfChange(book, shelf)} />
        </div> : null;
    }
}

SearchBookList.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired,
    addShelfToBooks: PropTypes.func.isRequired
};

export default SearchBookList;