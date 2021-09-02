import React from 'react';
import Header from './components/Header';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes/routes';

import './App.css';

const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<Header />
				<Routes />
			</div>
		</BrowserRouter>
	);
};

export default App;
