import React from 'react';
import { Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import FavoritesPage from '../pages/FavoritesPage';

const Routes = () => {
	return (
		<div className="routes-wrapper">
			<Route path="/" exact component={HomePage} />
			<Route path="/favorites" exact component={FavoritesPage} />
		</div>
	);
};

export default Routes;
