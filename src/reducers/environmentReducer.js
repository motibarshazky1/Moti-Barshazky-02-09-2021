import { TOGGLE_DEGREE_UNITS } from '../types';

const initialState = {
	units: 'c',
};

export const environmentReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case TOGGLE_DEGREE_UNITS: {
			return {
				...state,
				units: payload,
			};
		}
		default:
			return state;
	}
};
