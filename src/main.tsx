// main.tsx or index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // or wherever your App component is
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
 
    <BrowserRouter>
      <App />
    </BrowserRouter>
 
);
