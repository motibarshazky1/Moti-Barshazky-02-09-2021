import store from '../store';

import { ADD_CITY_TO_FAVORITES, REMOVE_CITY_FROM_FAVORITES } from '../types';

/**
 * @description add city to user's favorites cities in store
 * @param {object} cityToAdd - the city to add to favorites
 */
export const addCityToFavorites = (cityToAdd) => async (dispatch) => {
	try {
		if (cityToAdd) {
			const { cities } = store.getState().favorites;
			cities.push(cityToAdd);
			dispatch({ type: ADD_CITY_TO_FAVORITES, payload: cities });
		} else {
			console.log('Could not add city to favorites');
		}
	} catch (err) {
		console.log('Could not add city to favorites: ' + err);
		return err;
	}
};

/**
 * @description reomve city from user's favorites cities in store
 * @param {string} cityKey - the city to remove from favorites
 */
export const removeCityFromFavorites = (cityKey) => async (dispatch) => {
	try {
		if (cityKey) {
			const { cities } = store.getState().favorites;
			// update favorites cities array after removing current city from favorites
			const updatedCities = cities.filter((city) => city.id !== cityKey);
			dispatch({ type: REMOVE_CITY_FROM_FAVORITES, payload: updatedCities });
		} else {
			console.log('Could not remove city from favorites');
		}
	} catch (err) {
		console.log('Could not remove city from favorites: ' + err);
		return err;
	}
};
