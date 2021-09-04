import React from 'react';

import './index.css';

const FavoriteCity = ({ cityName, key, currentDegrees, currentTitle, onClickFavoriteCity }) => {
	return (
		<div className="city-wrapper" key={key} onClick={() => onClickFavoriteCity(key, cityName)}>
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
			<label className="label degrees">{`${currentDegrees}° c`}</label>
			<label className="label title">{currentTitle}</label>
		</div>
	);
};

export default FavoriteCity;
