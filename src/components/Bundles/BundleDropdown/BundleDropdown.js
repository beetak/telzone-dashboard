import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

const BundleDropdown = (props) => {
    const {data} = props 
    return (
        <>
            <Dropdown.Item 
                onClick={
                    () => {
                        props.setBundle(data.id, data.name, data.price)
                    }
                }
                >{data.name}
            </Dropdown.Item>
        </>
    );
}

export default BundleDropdown;
