import React, { Component } from 'react';
import * as categories from './categories';

class BookShelfChanger extends Component {
    state = {
        value: this.props.value
    }



    render() {
        const categoriesKeys = [...categories.values, categories.NO_CATEGORY_VAL];
        const categoriesLabels = [...categories.labels, categories.NO_CATEGORY_LABEL];

        return (
            <div className="book-shelf-changer">
                <select value="wanttoread" >
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
}

export default BookShelfChanger;