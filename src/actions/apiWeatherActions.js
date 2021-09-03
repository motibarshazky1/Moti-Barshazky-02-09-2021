import React from 'react';
import { SET_API_KEY } from '../types';

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
