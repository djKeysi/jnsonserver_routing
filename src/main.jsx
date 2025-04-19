// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import {App} from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage, TodosPage } from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			{' '}
			<App />
		</BrowserRouter>
	</React.StrictMode>,
);
