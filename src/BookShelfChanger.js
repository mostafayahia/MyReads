import React from 'react';
import * as categories from './categories';

const categoriesVals = [...categories.values, categories.NO_CATEGORY_VAL];
const categoriesLabels = [...categories.labels, categories.NO_CATEGORY_LABEL];

const BookShelfChanger = props => {

    const onSelectShelf = event => {
        const shelf = event.target.value;
        const book = props.book;
        props.onShelfChange(book, shelf);
    }

    return (
        <div className="book-shelf-changer">
            <select value={props.shelf} onChange={onSelectShelf}>
                <option value="move" disabled>Move to...</option>
                {
                    categoriesVals.map((key, index) => (
                        <option key={index} value={key}>{categoriesLabels[index]}</option>
                    ))
                }
            </select>
        </div>
    );

}

export default BookShelfChanger;