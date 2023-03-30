import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

export default function AgentDropdown(props){
    const {data} = props 
  return (
    <>
        <Dropdown.Item 
            onClick={
                () => {
                    props.setUser(data.id, data.adminPortalUsers.firstname)
                    
                }
            }
            >{data.adminPortalUsers.firstname}
        </Dropdown.Item>
    </>
  );
}

