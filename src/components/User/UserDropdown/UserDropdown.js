import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import { useDispatch } from 'react-redux';

export default function UserDropdown(props){
    const dispatch = useDispatch()
    const {data} = props 
    return (
        <>
            <Dropdown.Item 
                onClick={
                    () => {
                        // props.setUser(data.id, data.firstname)
                        props.setSupervisor(data.id, data.firstname, data.surname) 
                    }
                }
                >
                {data.firstname} {data.surname}
            </Dropdown.Item>
        </>
    );
}

