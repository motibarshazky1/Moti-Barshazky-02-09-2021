import React from 'react';
import { motion } from 'framer-motion';

import './index.css';

const item = {
	display: 'flex',
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

const FavoriteCity = ({ cityName, cityKey, currentDegrees, currentTitle, onClickFavoriteCity, units }) => {
	return (
		<motion.li key={cityKey} className="item" variants={item}>
			<div className="city-wrapper" key={cityKey} onClick={() => onClickFavoriteCity(cityKey, cityName)}>
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
				<label className="label name">{cityName}</label>
				<label className="label degrees">{`${currentDegrees}° ${units}`}</label>
				<label className="label title">{currentTitle}</label>
			</div>
		</motion.li>
	);
};

export default FavoriteCity;
