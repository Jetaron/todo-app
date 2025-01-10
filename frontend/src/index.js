import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({

});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <Router>
             <App />

        </Router>

    </ThemeProvider>


  </React.StrictMode>
);