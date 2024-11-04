import React, { useEffect, useState } from 'react';
import MerakiApi from '../../Api/MerakiApi';
import { BeatLoader } from 'react-spinners';
import { Dropdown } from 'react-bootstrap';

export default function TopUsage() {
    const [loading, setLoading] = useState('idle');
    const [loadingSSID, setLoadingSSID] = useState('idle');
    const [topClients, setTopClients] = useState([]);
    const [ssids, setSSIDs] = useState([]);
    const [ssid, setSSID] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    const [errorSSID, setErrorSSID] = useState("");

    useEffect(() => {
        const fetchSSIDs = async () => {
            setLoadingSSID('pending');
            try {
                const response = await MerakiApi.get(`/networks/L_575897802350008785/wireless/ssids`);
                if (response.data) {
                    console.log("ssids",response);
                    setSSIDs(response.data);
                }
                setLoadingSSID('idle');
            } catch (error) {
                console.error(error);
                setErrorSSID("Failed to load data.");
                setLoadingSSID('rejected');
            }
        };
        const fetchTopClients = async () => {
            setLoading('pending');
            try {
                const response = await MerakiApi.get(`/networks/L_575897802350008785/clients?timespan=86400&ssid=${ssid}`);
                if (response.data) {
                    console.log(response);
                    setTopClients(response.data); // Set the data correctly
                }
                setLoading('idle'); // Reset loading state
            } catch (error) {
                console.error(error);
                setErrorMsg("Failed to load data."); // Set error message
                setLoading('rejected'); // Update loading state to rejected
            }
        };
        fetchSSIDs()
        fetchTopClients();
    }, []);

    let loadingAnimation = (
        <tr style={anime}>
            <td colSpan={8}>
                <BeatLoader
                    color={'#055bb5'}
                    loading={loading === 'pending'}
                    cssOverride={override}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </td>
        </tr>
    );

    const bytesToGB = (bytes) => {
        return (bytes / (1024 ** 2)).toFixed(2);
    };

    const renderedData = topClients.length > 0 ? (
        topClients.map((client, index) => (
            <tr key={index} style={{lineHeight: "12px"}}>
                <td>{client.description}</td>
                <td>{client.mac}</td>
                <td>{client.ssid}</td>
                <td>{client.recentDeviceName}</td>
                <td>{bytesToGB(client.usage.sent)}</td>
                <td>{bytesToGB(client.usage.recv)}</td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan={8} className='text-center'>
                <h5 style={{ color: '#0C55AA' }}>No Clients Found</h5>
            </td>
        </tr>
    );

    const handleSelect = (value) => {
        setSSID(value);
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-12 mb-xl-0 mb-4">
                    <div className="card">
                        <Dropdown>
                            <Dropdown.Toggle 
                                className="btn bg-gradient-primary" 
                                id="dropdownMenuButton" 
                                variant="success"
                            >
                                {ssid}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {loadingSSID === 'pending' ? "Loading..." : 
                                 loadingSSID === 'rejected' ? "Error" : (
                                    ssids&&ssids.map((value, index) => (
                                        <Dropdown.Item 
                                            key={index} 
                                            onClick={() => handleSelect(value.name)}
                                        >
                                            {value.name}
                                        </Dropdown.Item>
                                    ))
                                 )}
                                
                            </Dropdown.Menu>
                        </Dropdown>
                        <table className="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Description</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">SSID</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Recent AP Name</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Sent (GB)</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Received (GB)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading === 'pending' ? loadingAnimation : 
                                 loading === 'rejected' ? (
                                     <tr>
                                         <td colSpan={8} className='text-center'>
                                             <h5 style={{ color: '#0C55AA' }}>{errorMsg}</h5>
                                         </td>
                                     </tr>
                                 ) : (
                                     renderedData
                                 )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
};
  
const anime = {
    textAlign: 'center', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%'
};