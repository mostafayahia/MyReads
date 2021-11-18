import React from 'react';
import Book from './Book';

const BookList = ({ books, onShelfChange }) => (
    <ol className="books-grid">
        {
            books && books.map(book => (
                <Book key={book.id}
                    id={book.id}
                    title={book.title}
                    authors={book.authors}
                    imageURL={(book.imageLinks && book.imageLinks['thumbnail']) || book.imageURL || ''}
                    shelf={book.shelf}
                    onShelfChange={onShelfChange} />
            ))
        }
    </ol>
);

export default BookList;