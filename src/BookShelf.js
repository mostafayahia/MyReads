import React from 'react';
import BookList from './BookList';
import PropTypes from 'prop-types';

const BookShelf = ({ title, books, onShelfChange }) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        {
            books && books.length ? <div className="bookshelf-books">
                <BookList onShelfChange={onShelfChange} books={books} />
            </div> : <p>No Books in this shelf yet.</p>
        }
    </div>
);

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array,
    onShelfChange: PropTypes.func.isRequired
};

export default BookShelf;