import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backbutton from '../images/chevron-left-solid.svg';
import '../stylesheets/App.css';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'



function Error() {
    const { errorCode, errorMessage } = useParams();
    const navigate = useNavigate();
    return (
        <main style={{ display: "grid", placeItems: "center" }}>
            <img class="back-button app-icon" src={backbutton} alt="Back Button" onClick={() => navigate(-1)} />
            <Alert severity="error">
                <AlertTitle>Error - {errorCode}</AlertTitle>
                <strong>{errorMessage}</strong>
            </Alert>

        </main>
    );
}
export default Error