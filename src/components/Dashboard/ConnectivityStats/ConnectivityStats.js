import { useDispatch, useSelector } from "react-redux";
import { getAllClients } from "../../../store/clients-slice";
import './blink.css'
import { useEffect, useState } from "react";
import { fetchAsyncSSIDs } from "../../../store/report-slice";
import { getAllLogins } from "../../../store/portal-slice";
import { fetchPrice } from "../../../store/basePrice-slice";

export default function ConnectivityStatsStats() {
    const [connected, setConnected] = useState(false);
    const [connection, setConnection] = useState(false);

    const clients = useSelector(getAllClients);
    const logins = useSelector(getAllLogins);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkConnections = () => {
            dispatch(fetchAsyncSSIDs())
                .then(response => {
                    setConnected(response.payload.success);
                })
                .catch(() => {
                    setConnected(false);
                });

            dispatch(fetchPrice())
                .then(response => {
                    setConnection(response.payload.success);
                })
                .catch(() => {
                    setConnection(false);
                });
        };
        checkConnections();
        const intervalId = setInterval(checkConnections, 60000);
        return () => clearInterval(intervalId);
    }, [dispatch]);

    const today = new Date();
    const date = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} ${today.getHours()}.${today.getMinutes()}`;

    return (
        <>
            <div className="row">
                <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                    <div className="card">
                        <div className="card-header p-3 pt-2">
                            <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                                <i className="material-icons opacity-10">sync_alt</i>
                            </div>
                            <div className="pt-5">
                                <p className="text-sm mb-0 mt-3 text-capitalize">Meraki connection status: {`\t`}
                                    {
                                        !connected ? (
                                            <span className='blink_text' style={{ color: 'red' }}><strong>Disconnected</strong></span>
                                        ) : (
                                            <span className='blink_text' style={{ color: '#4CAF50' }}><strong>Connected</strong></span>
                                        )
                                    }
                                </p>
                                <p className="text-sm mb-0 mt-1 text-capitalize">DB connection status: {`\t`}
                                    {
                                        !connection ? (
                                            <span className='blink_text' style={{ color: 'red' }}><strong>Disconnected</strong></span>
                                        ) : (
                                            <span className='blink_text' style={{ color: '#4CAF50' }}><strong>Connected</strong></span>
                                        )
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="card-footer p-2">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const err = {
    paddingTop: "8px",
    color: "red"
};

const LogoCentre = {
    width: 150,
    margin: '0 10px'
};
