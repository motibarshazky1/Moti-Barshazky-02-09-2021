import React from 'react';
import './index.css';

const DayWeather = ({ day, degree }) => {
	return (
		<div className="day-weather-wrapper">
			<label className="day-label">{day}</label>
			<label className="degree-label">{degree}</label>
		</div>
	);
};

export default DayWeather;
