import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { motion } from 'framer-motion';

import FavoriteCity from '../../components/FavoriteCity';

import './index.css';

const container = {
	display: 'flex',
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

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
			{/* {cities.map((city) => (
					<FavoriteCity
						key={city.id}
						cityKey={city.id}
						cityName={city.name}
						currentDegrees={units === 'c' ? city.currentCityWeather.degreesC : city.currentCityWeather.degreesF}
						currentTitle={city.currentCityWeather.title}
						onClickFavoriteCity={onClickFavoriteCity}
						units={units}
					/>
				))} */}
			{cities && (
				<motion.ul className="container" variants={container} initial="hidden" animate="visible">
					{cities.map((city) => (
						<FavoriteCity
							key={city.id}
							cityKey={city.id}
							cityName={city.name}
							currentDegrees={units === 'c' ? city.currentCityWeather.degreesC : city.currentCityWeather.degreesF}
							currentTitle={city.currentCityWeather.title}
							onClickFavoriteCity={onClickFavoriteCity}
							units={units}
						/>
					))}
				</motion.ul>
			)}
		</div>
	);
};

export default FavoritesPage;
