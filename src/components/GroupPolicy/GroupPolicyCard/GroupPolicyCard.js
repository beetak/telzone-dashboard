import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'

const GroupPolicyCard = (props) => {
    const {data} = props 
  return (
    <>
        <Dropdown.Item 
            onClick={
                () => {
                    props.setPolicy(data.groupPolicyId, data.name)
                }
            }
            >{data.name}
        </Dropdown.Item>
    </>
  );
}

export default GroupPolicyCard;
