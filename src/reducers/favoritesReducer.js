import { ADD_CITY_TO_FAVORITES, REMOVE_CITY_FROM_FAVORITES } from '../types';

const initialState = {
	cities: [],
};

export const favoritesReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_CITY_TO_FAVORITES:
		case REMOVE_CITY_FROM_FAVORITES: {
			return {
				...state,
				cities: payload,
			};
		}
		default:
			return state;
	}
};
