import React from 'react';

export default function BusinessRoleCard (props)  {
  const {data} = props 
  return (
    <>
      <td hidden>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{data.id}</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{data.name}</h6>
          </div>
        </div>
      </td>
      <td>
        <p clasName="text-xs font-weight-bold mb-0 w-10">{data.description}</p>
      </td>
      <td className="align-middle text-center">
        {/*<a className="btn btn-link text-danger text-gradient px-3 mb-0" href="javascript:;"><i className="material-icons text-sm me-2">delete</i>Delete</a>*/}
        <a className="btn btn-link text-dark px-3 mb-0" onClick={() => {

          let categoryStatus = ''
          if(data.active === true){
            categoryStatus = 'Active'
          }
          else {
            categoryStatus = 'Deactivated'
          }

          this.setState({ // set values to state individually
            categoryName: data.name,
            categoryDescription: data.description,
            categoryDuration: data.duration,
            categoryId: data.id
          })

          this.openModal() //opens the modal

        }}><i className="material-icons text-sm me-2">edit</i>Edit</a>
      </td>
    </>
  );
}