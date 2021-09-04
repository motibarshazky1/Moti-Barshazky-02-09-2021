import store from '../store';
import { TOGGLE_DEGREE_UNITS } from '../types';

/**
 * @description toggle between celcius and fahrenheit as degress units
 */
export const toggleDegreeUnits = () => async (dispatch) => {
	try {
		const { units } = store.getState().environment;
		if (units) {
			const chosenUnits = units === 'c' ? 'f' : 'c';
			dispatch({ type: TOGGLE_DEGREE_UNITS, payload: chosenUnits });
		} else {
			console.log('Could not toggle degree units');
		}
	} catch (err) {
		console.log('Could not toggle degree units: ' + err);
		return err;
	}
};
