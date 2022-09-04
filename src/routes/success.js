import React, { useEffect, useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import backbutton from '../images/chevron-left-solid.svg';
import '../stylesheets/App.css';
import axios from 'axios';
import CustomButton from '../components/button';

function Success() {
    const [scannerData, setScannerData] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getScannerData();
    }, []);

    const getScannerData = async () => {
        setLoaded(false);
        const getAPI = axios.create({
            baseURL: 'https://wavescan-internship.saurabhmudgal.repl.co/success'
        });
        const response = await getAPI.get();
        console.log(response);
        if (response.status === 200) {
            setScannerData(response.data);
            setLoaded(true);
        } else {
            navigate('/error');
        }
    }

    const renderScannerData = () => {
        return scannerData.map((data, index) => {
            return (
                <div className="scanner-data" key={index}>
                    <div className="text-white align-left">
                        {data.scannerName}
                    </div>
                    <div className="text-white">
                        {data.ipAddress}
                    </div>
                    <div className="text-white">
                        {data.scannerSpeed} m/s
                    </div>
                    <div className="text-white">
                        {(data.isAvailable === "true") ? "Availble" : "Engaged"}
                    </div>
                    <div style={{ width: "100%", height: "80%", display: "grid", placeItems: "center", fontSize: "12px" }}>
                        {data.isAvailable === "true" ?
                            <CustomButton
                                text="CONNECT"
                                onClick={() => console.log("click")}
                            /> :
                            <CustomButton
                                text="CONNECT"
                                onClick={() => console.log("click")}
                                colorVariant="disabled"
                            />
                        }

                    </div>


                </div>
            )
        })
    }

    return (
        <main>
            <img class="back-button app-icon" src={backbutton} alt="Back Button" onClick={() => navigate(-1)} />
            <div className='form-card success'>
                {loaded ? <div className='text-white align-left'>Scanners found: {scannerData.length}</div> : <div className='text-white align-left'>Loading...</div>}
                <div className='horizontal-line'></div>
                <div className='scanner-data'>
                    <div className="text-white align-left">Scanner Name</div>
                    <div className="text-white">IP Address</div>
                    <div className="text-white">Scanner Speed</div>
                    <div className="text-white">Status</div>
                    <div></div>
                </div>
                {renderScannerData()}
            </div>
            <Outlet />
        </main>
    );
}
export default Success