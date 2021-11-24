import React from 'react';
import PropTypes from 'prop-types';

const AppHeader = ({ headerText }) => (
    <div className="list-books-title">
        <h1>{headerText}</h1>
    </div>
);

AppHeader.propTypes = {
    headerText: PropTypes.string.isRequired,
};

export default AppHeader;