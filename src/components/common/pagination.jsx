import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

//to use lodash open terminal and nmp i lodash@4.17.10 - or yarn add using Rosetta
//lodash is a popular version of an optimized JS library called underscore
//so underscore is often used for import statement above, but can call it whatever (*, l, lodash, etc...)

const Pagination = (props) => {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;
    console.log('current page = ', currentPage);

    const pagesCount = Math.ceil(itemsCount / pageSize);
    
    if (pagesCount === 1) return null;
    
    const pages = _.range(1, pagesCount + 1);


    return (
        <nav>
            <ul className="pagination">
                { pages.map(page =>
                    <li key={page} className={ page === currentPage ? 'page-item active' : 'page-item' } >
                        <a 
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                )}
            </ul>
        </nav>
    )};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired
}
 
export default Pagination;
