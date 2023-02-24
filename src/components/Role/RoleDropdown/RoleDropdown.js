import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

const RoleDropdown = (props) => {
    const {data} = props 
  return (
    <>
        <Dropdown.Item 
            onClick={
                () => {
                    props.setRole(data.id, data.role)
                }
            }
            >{data.role}
        </Dropdown.Item>
    </>
  );
}

export default RoleDropdown;
