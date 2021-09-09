import React from 'react';

const ListGroup = (props) => {
    const { 
        items, 
        textProperty, 
        valueProperty, 
        selectedItem, 
        onItemSelect 
    } = props;

    return (
    <ul className="list-group">
        <li className="list-group-item" >
            All Movies
        </li>
        {items.map(item => (
            <li className={item === selectedItem ? "list-group-item active" : "list-group-item"} key={item[valueProperty]} onClick={()=> onItemSelect(item)} >
                {item[textProperty]}
        </li>
        ))}

    </ul>
    );
};

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
};
 
export default ListGroup;