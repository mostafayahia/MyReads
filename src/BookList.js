import React from 'react';
import Book from './Book';

const BookList = ({ books }) => (
    <ol className="books-grid">
        {
            books && books.length && books.map((book, index) => (
                <Book key={index}
                    title={book.title}
                    authors={book.authors}
                    imageURL={(book.imageLinks && book.imageLinks['thumbnail']) || ''} />
            ))
        }
    </ol>
);

export default BookList;