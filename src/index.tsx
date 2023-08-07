import { BrowserRouter } from "react-router-dom"
import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);
