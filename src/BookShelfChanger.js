import React, { Component } from 'react';
import * as categories from './categories';

const categoriesVals = [...categories.values, categories.NO_CATEGORY_VAL];
const categoriesLabels = [...categories.labels, categories.NO_CATEGORY_LABEL];

class BookShelfChanger extends Component {
    state = {
        value: this.props.value
    }

    componentDidUpdate(prevProp, prevState) {
        /* besides updating the state of shelfs,
         * we need also to make a network request to update the 
         * state of the shelf of this book so this function
         * is a good place to make this request
         * we have to make network request inside a condition below 
         * to avoid infinite loop.
         */
        if (this.state.value !== prevState.value) {
            const { book } = this.props
            this.props.onShelfChange(book, this.state.value);
        }
    }

    selectChangeHandler = event => {
        const { value } = event.target;
        this.setState(() => ({ value }))
    }

    render() {

        return (
            <div className="book-shelf-changer">
                <select value={this.state.value} onChange={this.selectChangeHandler}>
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