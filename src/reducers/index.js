import { combineReducers } from 'redux';

import { apiWeatherReducer } from './apiWeatherReducer';
import { favoritesReducer } from './favoritesReducer';
import { environmentReducer } from './environmentReducer';

export default combineReducers({
	apiWeather: apiWeatherReducer,
	favorites: favoritesReducer,
	environment: environmentReducer,
});
