import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './index.css';

const Home = () => {
	const { apiKey } = useSelector((state) => state.apiWeather);

	const [cityInput, setCityInput] = useState(''); // default city is Tel Aviv
	const [citiesOptions, setCitiesOptions] = useState([]);
	const [chosenCity, setChosenCity] = useState(citiesOptions[0]);

	const getRelevantCities = async (cityName) => {
		setCityInput(cityName);
		const response = await fetch(
			`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${cityName}&language=en`
		);
		const responseJsonArr = await response.json();
		setCitiesOptions(responseJsonArr);
	};

	return (
		<div className="home-wrapper">
			<Autocomplete
				value={chosenCity?.LocalizedName || ''}
				onChange={(event, newValue) => {
					setChosenCity(newValue.LocalizedName);
				}}
				inputValue={cityInput}
				onInputChange={(event, newValue) => getRelevantCities(newValue)}
				id="controllable-states-demo"
				options={citiesOptions}
				style={{ width: '25%' }}
				getOptionLabel={(city) => city.LocalizedName || ''}
				renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
			/>
		</div>
	);
};

export default Home;
