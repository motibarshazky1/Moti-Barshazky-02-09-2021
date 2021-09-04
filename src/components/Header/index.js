import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { AppBar, Toolbar, makeStyles, Button } from '@material-ui/core';

import './index.css';

const useStyles = makeStyles(() => ({
	appBar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	menuWrapper: {
		display: 'flex',
	},
	webTitle: {
		display: 'flex',
		paddingLeft: '50px',
		fontWeight: 'bold',
		fontSize: '21px',
	},
	menuButtons: {
		display: 'flex',
		paddingRight: '30px',
	},
	menuButton: {
		display: 'flex',
		fontSize: '17px',
		padding: '20px',
		fontFamily: 'Montserrat, Roboto, OpenSans',
		transition: 'all 0.5s linear',
		color: 'darkgrey',
	},
	menuButtonSelected: {
		display: 'flex',
		fontSize: '17px',
		padding: '20px',
		color: 'white',
		fontFamily: 'Montserrat, Roboto, OpenSans',
		transition: 'all 0.5s linear',
	},
}));

const Header = () => {
	const { menuButtons, menuButton, menuButtonSelected, webTitle, appBar } = useStyles();
	const [selectedHeader, setSelectedHeader] = useState('');

	useEffect(() => {
		// get the selected header from url param
		if (window.location.pathname.includes('favorites')) {
			setSelectedHeader('favorites');
		} else {
			setSelectedHeader('home');
		}
	}, []);

	const getWebTitle = () => {
		return <Toolbar className={webTitle}>Herolo Weather Task</Toolbar>;
	};

	return (
		<div className="header-wrapper">
			<AppBar className={appBar}>
				{getWebTitle()}
				<div className={menuButtons}>
					<Button
						onClick={() => setSelectedHeader('home')}
						{...{
							key: 'Home',
							color: 'inherit',
							to: '/',
							component: RouterLink,
							className: selectedHeader === 'home' ? menuButtonSelected : menuButton,
						}}
					>
						Home
					</Button>
					<Button
						onClick={() => setSelectedHeader('favorites')}
						{...{
							key: 'Favorites',
							color: 'inherit',
							to: '/favorites',
							component: RouterLink,
							className: selectedHeader === 'favorites' ? menuButtonSelected : menuButton,
						}}
					>
						Favorites
					</Button>
				</div>
			</AppBar>
		</div>
	);
};

export default Header;
