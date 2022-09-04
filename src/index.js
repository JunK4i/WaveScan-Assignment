import React from 'react';
import ReactDOM from 'react-dom/client';
import './stylesheets/index.css';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Success from './routes/success';
import Error from './routes/error';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path="/success" element={<Success />} />
      <Route exact path="/error" element={<Error />} />
      <Route exact path="/error/:errorCode/:errorMessage" element={<Error />} />
    </Routes>
  </BrowserRouter >
);


