import React, { Component } from 'react';
import BookList from './BookList';
import * as BooksAPI from './utils/BooksAPI';

class SearchBookList extends Component {
    state = {
        books: []
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
                .then(books => this.updateBooks(books));
        }
    }

    updateBooks(books) {
        // if there is an error, we will clear books search result
        if (!books || books.error) {
            this.setState(() => ({ books: [] }));
            return;
        }

        this.props.addShelfToBooks(books);

        books.forEach((book, index) => {
            if (index === 0) {
                this.setState(() => ({ books: [] }));
            } else {
                this.setState(prevState => ({ books: [...prevState.books, book] }));
            }
        });

    }

    onShelfChange(book, shelf) {
        this.setState(prevState => {
            const updatedBooks = [...prevState.books];
            updatedBooks.filter(b => b.id === book.id)[0].shelf = shelf;

            return { books: updatedBooks };
        });

        this.props.onShelfChange(book, shelf);
    }

    render() {
        return this.props.searchTerm ? <div className="search-books-grid">
            <BookList books={this.state.books} onShelfChange={(book, shelf) => this.onShelfChange(book, shelf)} />
        </div> : null;
    }
}

export default SearchBookList;