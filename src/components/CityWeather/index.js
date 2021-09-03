import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DayWeather from '../DayWeather';

import { addCityToFavorites, removeCityFromFavorites } from '../../actions/favoritesActions';

import './index.css';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const CityWeather = ({ cityName, cityKey, closeCityWeather }) => {
	const dispatch = useDispatch();
	const { cities } = useSelector((state) => state.favorites);

	const [currentWeather, setCurrentWeather] = useState({});
	const [fiveDaysWeather, setFiveDaysWeather] = useState([]);
	const [isCityFavorite, setIsCityFavorite] = useState(false);

	useEffect(() => {
		if (cityName && cityKey) {
			getCurrentWeather();
			getFiveDaysWeather();
			getIsCityFavorite();
		}
	}, [cityName, cityKey]);

	useEffect(() => {
		getIsCityFavorite();
	}, [cities]);

	// returns the day in the week for the given date
	const getDayInWeek = (stringDate) => {
		const date = new Date(stringDate);
		return days[date.getDay()];
	};

	const getCurrentWeather = async () => {
		await fetch(
			`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=bhOx7Wi06pAC43M5YXggSoSZbSAoV6QO`
		)
			.then((response) => response.json())
			.then((responseJsonArr) =>
				setCurrentWeather({
					title: responseJsonArr[0].WeatherText,
					degrees: responseJsonArr[0].Temperature.Metric.Value,
				})
			);
	};

	const getFiveDaysWeather = async () => {
		await fetch(
			`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=bhOx7Wi06pAC43M5YXggSoSZbSAoV6QO&metric=true`
		)
			.then((response) => response.json())
			.then((responseJsonArr) => {
				responseJsonArr.DailyForecasts.forEach((element) => {
					element.day = getDayInWeek(element.Date);
					element.maxDegrees = element.Temperature.Maximum.Value;
					element.minDegrees = element.Temperature.Minimum.Value;
				});
				setFiveDaysWeather(responseJsonArr.DailyForecasts);
			});
	};

	const getIsCityFavorite = () => {
		if (cities && cityName && cityKey) {
			// search if city is in favorites
			const cityFound = cities.find((city) => city.name === cityName);
			if (cityFound) {
				// city is in favorites
				setIsCityFavorite(true);
			} else {
				// city is NOT in favorites
				setIsCityFavorite(false);
			}
		}
	};

	const onClickFavButton = () => {
		setIsCityFavorite(!isCityFavorite);
		if (!isCityFavorite) {
			// add city to favorites
			const cityToAdd = {
				name: cityName,
				id: cityKey,
				currentCityWeather: {
					degrees: currentWeather.degrees,
					title: currentWeather.title,
				},
			};
			dispatch(addCityToFavorites(cityToAdd));
		} else {
			// remove city from favorites
			dispatch(removeCityFromFavorites(cityKey));
		}
	};

	return (
		<div className="city-weather-wrapper">
			<div className="header">
				<div className="sub-header left">
					<div className="close-icon-wrapper" onClick={closeCityWeather}>
						<HighlightOffIcon style={{ width: '3rem', height: '3rem' }} />
					</div>
					<div className="city-name-degrees-wrapper">
						<label className="city-name">{cityName}</label>
						<label className="header-degrees">{currentWeather?.degrees}° c</label>
					</div>
				</div>
				<div className="sub-header right">
					<div className="fav-indicator-wrapper" onClick={onClickFavButton}>
						{isCityFavorite ? (
							<FavoriteIcon style={{ width: '2rem', height: '2rem' }} />
						) : (
							<FavoriteBorderIcon style={{ width: '2rem', height: '2rem' }} />
						)}
					</div>
					<div className="fav-button-wrapper">
						<Button
							variant="outlined"
							color={`${!isCityFavorite ? 'primary' : 'secondary'}`}
							onClick={onClickFavButton}
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
							maxDegrees={`${dayWeather.maxDegrees}° c`}
							minDegrees={`${dayWeather.minDegrees}° c`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default CityWeather;
