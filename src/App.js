import './stylesheets/App.css';
import './stylesheets/Components.css';
import {
  useNavigate,
  Outlet,
} from "react-router-dom";
import TextInputField from './components/textInputField';
import SelectInputField from './components/selectInputField';
import CustomButton from './components/button';
import React, { useState } from "react";
import wavescanicon from './images/wavescan-website.png';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';


function App() {
  let navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    projectName: "",
    scanningMode: "",
    scanDimensionsX: "",
    scanDimensionsY: "",
    scannerFrequency: "",
  });

  const [formResponse, setFormResponse] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const scanning_modes = ["", "GANTRY", "CRAWLER", "AUTO", "MANUAL", "ARM"]
  const { projectName, scanningMode, scanDimensionsX, scanDimensionsY, scannerFrequency } = formValue;
  const submitFormAPI = axios.create({
    baseURL: 'https://wavescan-internship.saurabhmudgal.repl.co/submitForm'
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormValue((prev) => {
      // switch (name) {
      //   case "scanDimensionsX": value = parseInt(value); break;
      //   case "scanDimensionsY": value = parseInt(value); break;
      //   case "scannerFrequency": value = parseFloat(value); break;
      //   default: break;
      // }
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const handleClose = (e, formResponse) => {
    setOpen(false);
    if (formResponse === 200) {
      navigate("/success");
    } else if (formResponse === 400) {
      navigate(`/error/${formResponse}/${formError}`)
    } else if (formResponse === 500) {
      navigate(`/error/${formResponse}/Internal Server Error`)
    }
  }

  const handleSubmitScan = async (e) => {
    setIsLoading(true);
    let response = await submitFormAPI.post('', formValue, {
      headers: {
        'content-type': 'application/json'
      }
    })
    setIsLoading(false);
    if (response.data.status === 200) {
      setFormResponse(response.data.status);
    } else {
      setFormError(response.data.message);
      setFormResponse(response.data.status);
    }
    // .then((response) => {
    //   console.log(response);
    //   setIsLoading(false);
    //   setFormResponse(response.status)
    //   setOpen(true);
    // })
    // .catch((error) => {
    //   if (error.response) {
    //     console.log(error.response);
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     setFormError(error.response.data);
    //     setFormResponse(error.response.status);
    //     setOpen(true);
    //   } else if (error.request) {
    //     console.log(error.request);
    //   } else {
    //     console.log(error.message);
    //   }
    //   setIsLoading(false);
    // });
  }

  const renderCard = () => {
    return [<div className='form-card'>
      <TextInputField
        name="projectName"
        labelName='Project Name'
        placeholder='Enter Project Name'
        value={projectName}
        handleChange={handleChange}
      />
      <SelectInputField
        name="scanningMode"
        labelName='Scanning Mode'
        value={scanningMode}
        optionList={scanning_modes.map((mode) => {
          if (mode === "") { return <option value={mode}>Select Scanning Mode</option> }
          return <option value={mode}>{mode}</option>
        })}
        handleChange={handleChange}
      />
      <div style={{ width: "100%" }} className='input-label'>{"Scan Dimensions (cm)"}</div>
      <div style={{ width: "100%" }}>
        <div style={{ width: "50%", display: "inline-block" }}>
          <TextInputField
            name="scanDimensionsX"
            labelName='X'
            placeholder='0'
            value={scanDimensionsX}
            handleChange={handleChange}
            inline={true}
          />
        </div>
        <div style={{ width: "50%", display: "inline-block" }}>
          <TextInputField
            name="scanDimensionsY"
            labelName='Y'
            placeholder='0'
            value={scanDimensionsY}
            handleChange={handleChange}
            inline={true}
          />
        </div>
      </div>
      <TextInputField
        name="scannerFrequency"
        labelName='Scanner Frequency (GHz)'
        placeholder='Enter Scanner Frequency (GHz)'
        value={scannerFrequency}
        handleChange={handleChange}
      />
      <div style={{ width: "100%", height: "30px", display: "grid", placeItems: "center", margin: "10px 0px" }}>
        <CustomButton
          text="SCAN"
          handleClick={handleSubmitScan}
          loading={isLoading}
        />
      </div>
    </div>]
  }

  const renderAlert = () => {
    return [
      <div className='alert'>
        {
          (formResponse === 200) ?
            <Alert action={
              <Button color="inherit" size="small" onClick={(e) => { handleClose(e, formResponse) }}>
                NEXT
              </Button>}>
              Success!
            </Alert> :
            (formResponse === 400) ?
              <Alert severity="error" action={
                <Button color="inherit" size="small" onClick={(e) => { handleClose(e, formResponse) }}>
                  NEXT
                </Button>}>
                {"Error 400: " + formError}
              </Alert> :
              (formResponse === 500) ?
                <Alert severity="error" action={
                  <Button color="inherit" size="small" onClick={(e) => { handleClose(e, formResponse) }}>
                    NEXT
                  </Button>}>
                  {"Error 500: " + formError}
                </Alert> :
                <></>
        }
      </div>
    ]
  }
  return (
    <div className='app'>
      <img className='app-icon' src={wavescanicon} alt="Wavescan Icon" />
      {renderCard()}
      {open && renderAlert()}
      <Outlet />
    </div >
  );
}

export default App;
