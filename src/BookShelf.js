import React from 'react';
import BookList from './BookList';

const BookShelf = ({ title, books }) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
            <BookList books={books} />
        </div>
    </div>
);

export default BookShelf;