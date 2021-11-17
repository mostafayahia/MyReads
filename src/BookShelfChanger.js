import React from 'react';

const BookShelfChanger = () => (
    <div className="book-shelf-changer">
        <select>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read" selected>Read</option>
            <option value="none">None</option>
        </select>
    </div>
);

export default BookShelfChanger;