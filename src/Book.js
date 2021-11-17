import React from 'react';
import BookShelfChanger from './BookShelfChanger';

const Book = ({ title, authors, imageURL }) => (
    <li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ backgroundImage: `url(${imageURL})` }}></div>
                <BookShelfChanger />
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors.join(', ')}</div>
        </div>
    </li>
);

export default Book;