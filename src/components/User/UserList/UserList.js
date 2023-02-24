import React from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers, getLoadingStatus } from '../../../store/user-slice';
import UserCard from '../UserCard/UserCard';
import BeatLoader from 'react-spinners/BeatLoader'

const UserList = () => {
  
  const users = useSelector(getAllUsers)
  const loading = useSelector(getLoadingStatus)

  let loadingAnimation = 
  <tr className='' style={anime}>
    <td colspan={6}>
      <BeatLoader
        color={'#055bb5'}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </td>
  </tr>

  var count = Object.keys(users).length
  
  let renderedUser = ''
  if(count>0){
    renderedUser = (
      users.map((user, index)=>(
        <tr key={index}>
          <UserCard data={user} index={index}/>
        </tr>
      ))
    )
  }
  else{
    renderedUser = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Users Found</h5></td>
    </tr>
  }

  let errorMsg =  
    <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5></td>
    </tr>

  return (
    <div>
      <table className="table align-items-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Name</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Role</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">State</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            loading==='pending'?
            loadingAnimation: 
            loading ==='rejected'?
              errorMsg: renderedUser
          }
        </tbody>
      </table>
    </div>
  );
}

export default UserList;

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const anime = {
  textAlign: 'center', 
  justifyContent: 'center', 
  alignItems: 'center', 
  width: '100%', 
  height: '10vh'
}