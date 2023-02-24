import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

export default function BusinessRoleDropdown (props) {
    const{data} = props
    return (
        <>
            <Dropdown.Item 
                onClick={
                    () => {
                        props.setBusinessRole(data.id, data.name, data.vat, data.discount)
                    }
                }
                >{data.name}
            </Dropdown.Item>
        </>
    );
}
