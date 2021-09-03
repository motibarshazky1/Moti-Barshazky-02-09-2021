import React from 'react';
import './index.css';

const DayWeather = ({ day, maxDegrees, minDegrees }) => {
	return (
		<div className="day-weather-wrapper">
			<label className="day-label">{day}</label>
			<label className="degree-label">Day: {maxDegrees}</label>
			<label className="degree-label">Night: {minDegrees}</label>
		</div>
	);
};

export default DayWeather;
