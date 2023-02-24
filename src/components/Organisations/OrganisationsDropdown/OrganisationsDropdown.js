import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

const OrganisationsDropdown = (props) => {
    const {data} = props 
  return (
    <>
        <Dropdown.Item 
            onClick={
                () => {
                    props.setOrganisation(data.id, data.name)
                }
            }
            >{data.name}
        </Dropdown.Item>
    </>
  );
}

export default OrganisationsDropdown;
