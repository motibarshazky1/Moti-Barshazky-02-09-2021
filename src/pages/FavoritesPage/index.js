import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import FavoriteCity from '../../components/FavoriteCity';

import './index.css';

const FavoritesPage = () => {
	const history = useHistory();
	const { cities } = useSelector((state) => state.favorites);

	const onClickFavoriteCity = (cityId, cityName) => {
		history.push({ pathname: '/', state: { city: { name: cityName, key: cityId } } });
	};

	return (
		<div className="favorites-wrapper">
			{cities.map((city) => (
				<FavoriteCity
					key={city.id}
					cityName={city.name}
					currentDegrees={city.currentCityWeather.degrees}
					currentTitle={city.currentCityWeather.title}
					onClickFavoriteCity={onClickFavoriteCity}
				/>
			))}
		</div>
	);
};

export default FavoritesPage;
