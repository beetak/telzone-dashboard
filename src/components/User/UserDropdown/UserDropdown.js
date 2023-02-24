import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

const UserDropdown = (props) => {
    const {data} = props 
  return (
    <>
        <Dropdown.Item 
            onClick={
                () => {
                    props.setUser(data.id, data.name)
                }
            }
            >{data.name}
        </Dropdown.Item>
    </>
  );
}

export default UserDropdown;
