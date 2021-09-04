import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CityWeather from '../../components/CityWeather';
import Modal from '../../components/Modal';

import './index.css';

const Home = () => {
	const location = useLocation();
	const { apiKey } = useSelector((state) => state.apiWeather);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [errTitle, setErrTitle] = useState('');
	const [errMsg, setErrMsg] = useState('');

	const [citiesOptions, setCitiesOptions] = useState([]);
	const [chosenCity, setChosenCity] = useState({
		name: citiesOptions[0]?.name || 'Tel Aviv',
		key: citiesOptions[0]?.key || '215854',
	});

	useEffect(() => {
		if (location.state) {
			const { city } = location.state;
			setChosenCity(city);
		}
	}, [location.state]);

	/**
	 * @description make an api request and get all cities filtered by the input
	 * @param {string} cityName - the value of the inserted input
	 */
	const getRelevantCities = async (cityName) => {
		if (!cityName) {
			setCitiesOptions([]);
		} else {
			await fetch(
				`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=GchBuAUJb6shY0kGJeH17bHry7qegwzu&q=${cityName}&language=en`
			)
				.then((response) => response.json())
				.then((responseJsonArr) =>
					responseJsonArr.map((city) => {
						return { name: city.LocalizedName, key: city.Key };
					})
				)
				.then((citiesArr) => setCitiesOptions(citiesArr))
				.catch((err) => {
					setErrTitle('Error while trying to fetch getRelevantCities:');
					setErrMsg(err.message);
					setIsModalOpen(true);
				});
		}
	};

	/**
	 * @description handle click on close icon to close the current city weather shown
	 */
	const closeCityWeather = () => {
		setChosenCity({});
		setCitiesOptions([]);
	};

	const onCloseModal = () => {
		setIsModalOpen(false);
		setErrTitle('');
		setErrMsg('');
	};

	return (
		<div className="home-wrapper">
			{errMsg && errTitle && isModalOpen && (
				<Modal open={isModalOpen} onClose={onCloseModal} errMsg={errMsg} errTitle={errTitle} />
			)}

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
				getOptionSelected={(option, value) => option.name === value.name}
			/>
			{chosenCity?.name && chosenCity?.key && (
				<CityWeather cityName={chosenCity?.name} cityKey={chosenCity?.key} closeCityWeather={closeCityWeather} />
			)}
		</div>
	);
};

export default Home;
