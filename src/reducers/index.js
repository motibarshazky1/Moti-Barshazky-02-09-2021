import { combineReducers } from 'redux';

import apiWeatherReducer from './apiWeatherReducer';
import favoritesReducer from './favoritesReducer';

export default combineReducers({
	apiWeather: apiWeatherReducer,
	favorites: favoritesReducer,
});
