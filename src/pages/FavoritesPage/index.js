import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

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
				<div className="city-wrapper" key={city.id} onClick={() => onClickFavoriteCity(city.id, city.name)}>
					<svg
						fill="yellow"
						className="fav-icon"
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
					>
						<path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
					</svg>
					<label className="label name">{city.name}</label>
					<label className="label degrees">{`${city.currentCityWeather.degrees}° c`}</label>
					<label className="label title">{city.currentCityWeather.title}</label>
				</div>
			))}
		</div>
	);
};

export default FavoritesPage;
