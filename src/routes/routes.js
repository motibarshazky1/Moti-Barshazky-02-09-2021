import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
const Routes = () => {
	return (
		<div className="routes-wrapper">
			<Route path="/" exact component={HomePage} />
		</div>
	);
};

export default Routes;
