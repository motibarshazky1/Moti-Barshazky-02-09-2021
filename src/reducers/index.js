import { combineReducers } from 'redux';

import apiWeatherReducer from './apiWeatherReducer';

export default combineReducers({
	apiWeather: apiWeatherReducer,
});
