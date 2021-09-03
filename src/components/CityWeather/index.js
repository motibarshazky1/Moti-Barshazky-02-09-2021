import React, { useState, useEffect } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DayWeather from '../DayWeather';

import './index.css';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const CityWeather = ({ city, cityKey, isFav, closeCityWeather }) => {
	const [currentWeather, setCurrentWeather] = useState({});
	const [fiveDaysWeather, setFiveDaysWeather] = useState([]);

	useEffect(() => {
		if (city && cityKey) {
			getCurrentWeather();
			getFiveDaysWeather();
		}
	}, [city, cityKey]);

	// returns the day in the week for the given date
	const getDayInWeek = (stringDate) => {
		const date = new Date(stringDate);
		return days[date.getDay()];
	};

	const getCurrentWeather = async () => {
		await fetch(
			`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=EYkBWBy6V8KN1GsvNfXJXmw4d3Y8urrx`
		)
			.then((response) => response.json())
			.then((responseJsonArr) =>
				setCurrentWeather({ title: responseJsonArr[0].WeatherText, temp: responseJsonArr[0].Temperature.Metric.Value })
			);
	};

	const getFiveDaysWeather = async () => {
		await fetch(
			`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=EYkBWBy6V8KN1GsvNfXJXmw4d3Y8urrx&metric=true`
		)
			.then((response) => response.json())
			.then((responseJsonArr) => {
				responseJsonArr.DailyForecasts.forEach((element) => {
					element.day = getDayInWeek(element.Date);
					element.maxTemp = element.Temperature.Maximum.Value;
				});
				setFiveDaysWeather(responseJsonArr.DailyForecasts);
			});
	};

	return (
		<div className="city-weather-wrapper">
			<div className="header">
				<div className="sub-header left">
					<div className="close-icon-wrapper" onClick={closeCityWeather}>
						<HighlightOffIcon style={{ width: '3rem', height: '3rem' }} />
					</div>
					<div className="city-name-degrees-wrapper">
						<label className="city-name">{city}</label>
						<label className="header-degrees">{currentWeather?.temp}° c</label>
					</div>
				</div>
				<div className="sub-header right">
					<div className="fav-indicator-wrapper">
						{isFav ? (
							<FavoriteIcon style={{ width: '2rem', height: '2rem' }} />
						) : (
							<FavoriteBorderIcon style={{ width: '2rem', height: '2rem' }} />
						)}
					</div>
					<div className="fav-button-wrapper">
						<Button variant="outlined" color={`${!isFav ? 'primary' : 'secondary'}`}>
							{`${!isFav ? 'Add To' : 'Remove From'} Favorites`}
						</Button>
					</div>
				</div>
			</div>
			<div className="body">
				<label className="current-weather-title">{currentWeather?.title}</label>
				<div className="five-days-weather">
					{fiveDaysWeather.map((dayWeather, index) => (
						<DayWeather key={index} day={dayWeather.day} degree={`${dayWeather.maxTemp}° c`} />
					))}
				</div>
			</div>
		</div>
	);
};

export default CityWeather;
