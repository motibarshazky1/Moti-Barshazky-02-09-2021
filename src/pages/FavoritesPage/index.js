import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './index.css';

const FavoritesPage = () => {
	const { cities } = useSelector((state) => state.favorites);
	return (
		<div className="favorites-wrapper">
			{cities.map((city) => (
				<div className="city-wrapper" key={city.id}>
					<label className="label name">{city.name}</label>
					{/* <label>{`${city.currentCityWeather.degrees}° c`}</label> */}
					{/* <label>{city.currentCityWeather.title}</label> */}
					<label className="label degrees">38 c</label>
					<label className="label title">Sunny</label>
				</div>
			))}
		</div>
	);
};

export default FavoritesPage;
