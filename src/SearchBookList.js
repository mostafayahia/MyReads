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
        books && !books.error && books.forEach((book, index) => {
            if (index === 0) {
                this.setState(() => ({books: []}));
            } else {
                this.setState(prevState => ({books: [...prevState.books, book]}));
            }
        });
        
        // if there is an error, we will clear books search result
        if (books.error)  {
            this.setState(() => ({books: []})); 
        }
    }

    render() {
        return this.props.searchTerm ? <BookList books={this.state.books} /> : null;
    }
}

export default SearchBookList;