import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

const AdvertDropdown = (props) => {
    const {data} = props 
  return (
    <>
        <Dropdown.Item 
            onClick={
                () => {
                    props.setCategory(data.id, data.name)
                }
            }
            >{data.name}
        </Dropdown.Item>
    </>
  );
}

export default AdvertDropdown;
