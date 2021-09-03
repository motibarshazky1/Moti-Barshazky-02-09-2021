import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import CityWeather from '../../components/CityWeather';
import './index.css';

const Home = () => {
	const { apiKey } = useSelector((state) => state.apiWeather);

	const [citiesOptions, setCitiesOptions] = useState([]);
	const [chosenCity, setChosenCity] = useState({
		name: citiesOptions[0]?.name || 'Tel Aviv',
		key: citiesOptions[0]?.key || '215854',
	});

	const getRelevantCities = async (cityName) => {
		if (!cityName) {
			setCitiesOptions([]);
		} else {
			await fetch(
				`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=EYkBWBy6V8KN1GsvNfXJXmw4d3Y8urrx&q=${cityName}&language=en`
			)
				.then((response) => response.json())
				.then((responseJsonArr) =>
					responseJsonArr.map((city) => {
						return { name: city.LocalizedName, key: city.Key };
					})
				)
				.then((citiesArr) => setCitiesOptions(citiesArr));
		}
	};

	const closeCityWeather = () => {
		setChosenCity({});
		setCitiesOptions([]);
	};

	return (
		<div className="home-wrapper">
			<Autocomplete
				id="combo-box-demo"
				options={citiesOptions}
				getOptionLabel={(city) => city.name || ''}
				style={{ width: '25%', display: 'flex' }}
				onInputChange={(event, newValue) => getRelevantCities(newValue)}
				onChange={(event, city) => {
					if (city) {
						setChosenCity({ name: city.name, key: city.key });
					} else {
						// city is empty string
						setChosenCity({});
					}
				}}
				renderInput={(params) => <TextField {...params} label="City" variant="outlined" />}
			/>
			{chosenCity?.name && chosenCity?.key && (
				<CityWeather cityName={chosenCity?.name} cityKey={chosenCity?.key} closeCityWeather={closeCityWeather} />
			)}
		</div>
	);
};

export default Home;
