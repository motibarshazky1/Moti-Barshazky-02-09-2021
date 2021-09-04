import { SET_API_KEY } from '../types';

const initialState = {
	apiKey: '',
};

export const apiWeatherReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_API_KEY: {
			return {
				...state,
				apiKey: payload,
			};
		}
		default:
			return state;
	}
};
