import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setApiKeyWeather } from './actions/apiWeatherActions';
import Header from './components/Header';
import Routes from './routes/routes';

import './App.css';

const API_KEY = 'bhOx7Wi06pAC43M5YXggSoSZbSAoV6QO';

const App = () => {
	const dispatch = useDispatch();

	// once app is up - set API KEY for weather app
	useEffect(() => {
		dispatch(setApiKeyWeather(API_KEY));
	});

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
