import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { getAllClients, getLoadingStatus } from '../../../store/clients-slice';
import { getAllNetworkClients } from '../../../store/report-slice';
import CustomerCard from '../CustomerCard/CustomerCard';
import { BeatLoader } from 'react-spinners';

const userRole = localStorage.getItem('role')

const CustomerList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);

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
    

  const clients = useSelector(getAllClients)

  const totalPages = Math.ceil(clients.length / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = clients.slice(startIndex, endIndex);

  useEffect(() => {
    // Filter clients based on search query
    const filtered = clients.filter((client) => {
      const firstName = client.firstName || '';
      const lastName = client.lastName || '';
      const phoneNumber = client.phoneNumber || '';
      const email = client.email || '';
  
      return (
        firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  
    setFilteredClients(filtered);
  }, [searchQuery, clients]);

  var count = Object.keys(paginatedData).length
  var filterCount = Object.keys(filteredClients).length

  let renderedClients = '';
if (searchQuery !== '') {
  const count = Object.keys(filteredClients).length;
  if (count > 0) {
    renderedClients = filteredClients.map((client, index) => (
      <tr key={index}>
        <CustomerCard data={client} />
      </tr>
    ));
  } else {
    renderedClients = (
      <tr>
        <td colspan={7} className='text-center'>
          <h5 style={{ color: '#0C55AA' }}>No Customers Found</h5>
        </td>
      </tr>
    );
  }
} else {
  const count = Object.keys(paginatedData).length;
  if (count > 0) {
    renderedClients = paginatedData.map((client, index) => (
      <tr key={index}>
        <CustomerCard data={client} />
      </tr>
    ));
  } else {
    renderedClients = (
      <tr>
        <td colspan={7} className='text-center'>
          <h5 style={{ color: '#0C55AA' }}>No Customers Found</h5>
        </td>
      </tr>
    );
  }
}

  let errorMsg =  
    <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5></td>
    </tr>

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-2 mx-2">
        <div className="d-flex align-items-center mx-2">
          <h6 className="mb-1 text-dark text-sm me-2">Show </h6>
          <div className="dropdown">
            <button className="btn bg-gradient-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" style={{width:100}}>
              {itemsPerPage}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" onClick={()=>setItemsPerPage(5)}>5</a></li>
              <li><a className="dropdown-item" onClick={()=>setItemsPerPage(10)}>10</a></li>
              <li><a className="dropdown-item" onClick={()=>setItemsPerPage(15)}>15</a></li>
              <li><a className="dropdown-item" onClick={()=>{setItemsPerPage(clients.length); setCurrentPage(1)}}>All</a></li>
            </ul>
          </div>
          <h6 className="mb-1 text-dark text-sm ms-2">Entries </h6>
        </div>
        <form>
          <div className="row">
            <div className="col-12">
              <div className="input-group input-group-outline my-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  style={{ height: '40px', padding: 0 }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ height: '40px', width: 100, padding: 0 }}
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </form> 
      </div>
      <table className="table align-items-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">First Name</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Last Name</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Phone Number</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Email</th>
          </tr>
        </thead>
        <tbody>
        {
          loading==='pending'?
          loadingAnimation: 
          loading ==='rejected'?
            errorMsg:  renderedClients
        }
        </tbody>
      </table>
      <div className="d-flex align-items-center justify-content-center">
          <p>Showing Page {currentPage} of {totalPages}</p>
      </div>
      <div className="d-flex align-items-center justify-content-center mb-2">
        <button 
          className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        ><i className="material-icons text-lg">chevron_left</i></button>
        <div className="d-flex flex-column" style={{ marginRight: "20px" }}>
          <h6 className="mb-1 text-dark text-sm">{currentPage}</h6>
        </div>
        <button 
          className="btn btn-icon-only btn-rounded btn-outline-success mb-0 me-3 p-3 btn-sm d-flex align-items-center justify-content-center"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        ><i className="material-icons text-lg">chevron_right</i></button>
      </div>
    </div>
  );
}

export default CustomerList;

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
