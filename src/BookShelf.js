import React from 'react';
import BookList from './BookList';

const BookShelf = ({ title, books }) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        {
            books && books.length ? <div className="bookshelf-books">
                <BookList books={books} />
            </div> : <p>No Books in this shelf yet.</p>
        }
    </div>
);

export default BookShelf;