import { SET_API_KEY } from '../types';

/**
 * @description save api key in store for AccuWeather web
 * @param {string} apiKey - the api key to save
 */
export const setApiKeyWeather = (apiKey) => async (dispatch) => {
	try {
		if (apiKey) {
			dispatch({ type: SET_API_KEY, payload: apiKey });
		} else {
			console.log('Could not save api Key');
		}
	} catch (err) {
		console.log('Could not save api Key: ' + err);
		return err;
	}
};
