import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

const SessionsDropdown = (props) => {
    const {data} = props 
  return (
    <>
        <Dropdown.Item 
            onClick={
                () => {
                    props.setSession(data.id, data.name)
                }
            }
            >{data.name}
        </Dropdown.Item>
    </>
  );
}

export default SessionsDropdown;
