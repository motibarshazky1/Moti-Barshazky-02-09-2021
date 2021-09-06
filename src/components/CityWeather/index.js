import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import DayWeather from '../DayWeather';

import { addCityToFavorites, removeCityFromFavorites } from '../../actions/favoritesActions';

import Modal from '../Modal';

import './index.css';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const CityWeather = ({ cityName, cityKey, closeCityWeather }) => {
	const dispatch = useDispatch();
	const { cities } = useSelector((state) => state.favorites);
	const { apiKey } = useSelector((state) => state.apiWeather);
	const { units } = useSelector((state) => state.environment);

	const [currentWeather, setCurrentWeather] = useState({});
	const [fiveDaysWeather, setFiveDaysWeather] = useState([]);
	const [isCityFavorite, setIsCityFavorite] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [errTitle, setErrTitle] = useState('');
	const [errMsg, setErrMsg] = useState('');

	useEffect(() => {
		if (cityName && cityKey) {
			getCurrentWeather();
			getFiveDaysWeather();
			getIsCityFavorite();
		}
	}, [cityName, cityKey]);

	useEffect(() => {
		if (cities) {
			getIsCityFavorite();
		}
	}, [cities]);

	/**
	 * @description returns the day in the week for the given date
	 * @param {string} stringDate - day date as string
	 */
	const getDayInWeek = (stringDate) => {
		if (stringDate) {
			const date = new Date(stringDate);
			return days[date.getDay()];
		}
	};

	/**
	 * @description make an api request and get current weather in specific city
	 */
	const getCurrentWeather = async () => {
		try {
			await fetch(`https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`)
				.then((response) => response.json())
				.then((responseJsonArr) =>
					setCurrentWeather({
						title: responseJsonArr[0].WeatherText,
						degreesC: responseJsonArr[0].Temperature.Metric.Value,
						degreesF: responseJsonArr[0].Temperature.Imperial.Value,
					})
				);
		} catch (err) {
			setErrTitle('Error while trying to fetch getCurrentWeather:');
			setErrMsg(err.message);
			setIsModalOpen(true);
		}
	};

	/**
	 * @description make an api request and get 5 days weather in specific city
	 */
	const getFiveDaysWeather = async () => {
		try {
			await fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&metric=true`)
				.then((response) => response.json())
				.then((responseJsonArr) => {
					responseJsonArr.DailyForecasts.forEach((element) => {
						element.day = getDayInWeek(element.Date);
						element.maxDegreesC = element.Temperature.Maximum.Value;
						element.minDegreesC = element.Temperature.Minimum.Value;
						element.maxDegreesF = ((element.Temperature.Maximum.Value * 9) / 5 + 32).toFixed(0); // calc degrees in F
						element.minDegreesF = ((element.Temperature.Minimum.Value * 9) / 5 + 32).toFixed(0); // calc degrees in F
					});
					setFiveDaysWeather(responseJsonArr.DailyForecasts);
				});
		} catch (err) {
			setErrTitle('Error while trying to fetch getCurrentWeather:');
			setErrMsg(err.message);
			setIsModalOpen(true);
		}
	};

	/**
	 * @description check if city is in user's favorites cities
	 */
	const getIsCityFavorite = () => {
		if (cities && cityName && cityKey) {
			const cityFound = cities.find((city) => city.name === cityName);
			if (cityFound) {
				// city is in favorites
				setIsCityFavorite(true);
			} else {
				// city is NOT in favorites
				setIsCityFavorite(false);
			}
		} else {
			setErrTitle('Error while trying to fetch getCurrentWeather:');
			setErrMsg('There are no favorite cities or no city has been chosen');
			setIsModalOpen(true);
		}
	};

	/**
	 * @description handle click on favorite button to toggle city's favorite mode
	 */
	const onClickFavButton = () => {
		setIsCityFavorite(!isCityFavorite);
		let res;
		if (!isCityFavorite) {
			// add city to favorites
			const cityToAdd = {
				name: cityName,
				id: cityKey,
				currentCityWeather: {
					degreesC: currentWeather.degreesC,
					degreesF: currentWeather.degreesF,
					title: currentWeather.title,
				},
			};
			res = dispatch(addCityToFavorites(cityToAdd));
		} else {
			// remove city from favorites
			res = dispatch(removeCityFromFavorites(cityKey));
		}
		if (res) {
			setErrTitle('Error while trying to execute onClickFavButton:');
			setErrMsg(res.message);
			setIsModalOpen(true);
		}
	};

	const onCloseModal = () => {
		setIsModalOpen(false);
		setErrTitle('');
		setErrMsg('');
	};

	return (
		<div className="city-weather-wrapper">
			{errMsg && errTitle && isModalOpen && (
				<Modal open={isModalOpen} onClose={onCloseModal} errMsg={errMsg} errTitle={errTitle} />
			)}
			<div className="header">
				<div className="sub-header left">
					<div className="close-icon-wrapper" onClick={closeCityWeather}>
						<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 24 24">
							<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" />
						</svg>
					</div>
					<div className="city-name-degrees-wrapper">
						<label className="city-name">{cityName}</label>
						<label className="header-degrees">
							{units === 'c' ? currentWeather?.degreesC : currentWeather?.degreesF}° {units}
						</label>
					</div>
				</div>
				<div className="sub-header right">
					<div className="fav-indicator-wrapper" onClick={onClickFavButton}>
						<svg
							className="favorite-icon"
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 25 25"
							fill={`${isCityFavorite ? 'red' : ''}`}
							style={{ transition: 'fill 0.5s linear' }}
						>
							<path d="M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z" />
						</svg>
					</div>
					<div className="fav-button-wrapper">
						<Button
							variant="outlined"
							color={`${!isCityFavorite ? 'primary' : 'secondary'}`}
							onClick={onClickFavButton}
							style={{ transition: 'all 0.5s linear' }}
						>
							{`${!isCityFavorite ? 'Add To' : 'Remove From'} Favorites`}
						</Button>
					</div>
				</div>
			</div>
			<div className="body">
				<label className="current-weather-title">{currentWeather?.title}</label>
				<div className="five-days-weather">
					{fiveDaysWeather.map((dayWeather, index) => (
						<DayWeather
							key={index}
							day={dayWeather.day}
							maxDegrees={`${units === 'c' ? dayWeather.maxDegreesC : dayWeather.maxDegreesF}° ${units}`}
							minDegrees={`${units === 'c' ? dayWeather.minDegreesC : dayWeather.minDegreesF}° ${units}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default CityWeather;
