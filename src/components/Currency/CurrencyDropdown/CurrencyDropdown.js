import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

const CurrencyDropdown = (props) => {
    const {data} = props 
  return (
    <>
        <Dropdown.Item 
            onClick={
                () => {
                    props.setCurrency(data.id, data.name, data.symbol)
                }
            }
            >{data.name}
        </Dropdown.Item>
    </>
  );
}

export default CurrencyDropdown;
