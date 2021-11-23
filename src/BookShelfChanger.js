import React, { Component } from 'react';
import * as categories from './categories';
import * as BooksAPI from './utils/BooksAPI';

const categoriesVals = [...categories.values, categories.NO_CATEGORY_VAL];
const categoriesLabels = [...categories.labels, categories.NO_CATEGORY_LABEL];

class BookShelfChanger extends Component {

    componentDidUpdate(prevProp) {
        /* besides updating the state of shelfs,
         * we need also to make a network request to update the 
         * state of the shelf of this book so this function
         * is a good place to make this request
         * we have to make network request inside a condition below 
         * to avoid infinite loop.
         */
        if (this.props.shelf !== prevProp.shelf) {
            BooksAPI.update(this.props.book, this.props.shelf);
        }
    }

    onSelectShelf(event) {
        const shelf = event.target.value;
        const book = this.props.book;
        this.props.onShelfChange(book, shelf);
    }

    render() {

        return (
            <div className="book-shelf-changer">
                <select value={this.props.shelf} onChange={event => this.onSelectShelf(event)}>
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
}

export default BookShelfChanger;