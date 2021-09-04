import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import FavoriteCity from '../../components/FavoriteCity';

import './index.css';

const FavoritesPage = () => {
	const history = useHistory();
	const { cities } = useSelector((state) => state.favorites);
	const { units } = useSelector((state) => state.environment);

	// handle click on favorite city and navigate to home page
	const onClickFavoriteCity = (cityId, cityName) => {
		history.push({ pathname: '/', state: { city: { name: cityName, key: cityId } } });
	};

	return (
		<div className="favorites-wrapper">
			{cities.map((city) => (
				<FavoriteCity
					key={city.id}
					cityKey={city.id}
					cityName={city.name}
					currentDegrees={city.currentCityWeather.degrees}
					currentTitle={city.currentCityWeather.title}
					onClickFavoriteCity={onClickFavoriteCity}
					units={units}
				/>
			))}
		</div>
	);
};

export default FavoritesPage;
