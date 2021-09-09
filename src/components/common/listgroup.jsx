import React from 'react';

const ListGroup = (props) => {
    const { items, textProperty, valueProperty } = props;

    return (
    <ul className="list-group">
        <li className="list-group-item">
            All Movies
        </li>
        {items.map(item => (
            <li className="list-group-item" key={item[valueProperty]}>
                {item[textProperty]}
        </li>
        ))}

    </ul>
    );
};
 
export default ListGroup;