import React from 'react';
import BookShelfChanger from './BookShelfChanger';
import { NO_CATEGORY_VAL } from './categories';
import PropTypes from 'prop-types';

const Book = (props) => (
    <li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover"
                    style={{
                        backgroundImage: `url(${(props.imageLinks && props.imageLinks.thumbnail) || ''})`
                    }}></div>
                <BookShelfChanger shelf={props.shelf || NO_CATEGORY_VAL} book={props} onShelfChange={props.onShelfChange} />
            </div>
            <div className="book-title">{props.title}</div>
            <div className="book-authors">
                {(props.authors && props.authors.length) ? props.authors.join(', ') : 'N/A'}
            </div>
        </div>
    </li>
);

Book.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    imageLinks: PropTypes.object,
    shelf: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
};

export default Book;