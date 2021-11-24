import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const BookList = ({ books, onShelfChange }) => (
    <ol className="books-grid">
        {
            books && books.map(book => (
                <Book key={book.id}
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    imageLinks={book.imageLinks}
                    shelf={book.shelf}
                    onShelfChange={onShelfChange} />
            ))
        }
    </ol>
);

BookList.propTypes = {
    books: PropTypes.array,
    onShelfChange: PropTypes.func.isRequired,
};

export default BookList;