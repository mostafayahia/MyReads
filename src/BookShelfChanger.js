import React from 'react';
import * as categories from './categories';

const BookShelfChanger = () => {
    const categoriesKeys = [...categories.keys, categories.NO_CATEGORY_KEY];
    const categoriesLabels = [...categories.labels, categories.NO_CATEGORY_LABEL];

    return (
        <div className="book-shelf-changer">
            <select defaultValue="wanttoread" >
                <option value="move" disabled>Move to...</option>
                {
                    categoriesKeys.map((key, index) => (
                        <option key={index} value={key}>{categoriesLabels[index]}</option>
                    ))
                }
            </select>
        </div>
    );
}

export default BookShelfChanger;