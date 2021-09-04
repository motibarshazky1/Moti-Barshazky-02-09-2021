import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppBar, Toolbar, makeStyles, Button } from '@material-ui/core';

import { toggleDegreeUnits } from '../../actions/environmentActions';

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
		cursor: 'pointer',
	},
	menuButtons: {
		display: 'flex',
		paddingRight: '30px',
		justifyContent: 'center',
		alignItems: 'center',
	},
	menuButton: {
		display: 'flex',
		fontSize: '17px',
		fontFamily: 'Montserrat, Roboto, OpenSans',
		transition: 'all 0.5s linear',
		color: 'darkgrey',
	},
	menuButtonSelected: {
		display: 'flex',
		fontSize: '17px',
		color: 'white',
		fontFamily: 'Montserrat, Roboto, OpenSans',
		transition: 'all 0.5s linear',
	},
	svg: {
		transition: 'all 0.5s linear',
		cursor: 'pointer',
	},
}));

const Header = () => {
	const location = useLocation();
	const { menuButtons, menuButton, menuButtonSelected, webTitle, appBar, svg } = useStyles();
	const [selectedHeader, setSelectedHeader] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		// get the selected header from url param
		if (window.location.pathname.includes('favorites')) {
			setSelectedHeader('favorites');
		} else {
			setSelectedHeader('home');
		}
	}, [location]);

	const onClickToggle = () => {
		dispatch(toggleDegreeUnits());
	};

	return (
		<div className="header-wrapper">
			<AppBar className={appBar}>
				<Toolbar className={webTitle}>Herolo Weather Task</Toolbar>{' '}
				<div className={menuButtons}>
					<Button onClick={onClickToggle} style={{ padding: '20px 35px 20px 10px', marginRight: '40px' }}>
						TOGGLE
					</Button>
					<svg
						onClick={() => setSelectedHeader('home')}
						className={svg}
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 26 26"
						fill={`${selectedHeader === 'home' ? 'white' : 'darkgrey'}`}
					>
						<path d="M12 2h2v2h2v3.702l7 2.618v12.68h1v1h-24v-1h1v-11h6v-8h2v-2h2v-2h1v2zm3 3h-7v18h1v-2h5v2h1v-18zm-2 17h-3v1h3v-1zm8 1h1v-11.987l-6-2.243v14.23h1v-2h4v2zm-14-10h-5v10h1v-2h3v2h1v-10zm-2 9h-1v1h1v-1zm15 0h-2v1h2v-1zm-16-5v2h-1v-2h1zm2 0v2h-1v-2h1zm5-10v12h-1v-12h1zm10 11v1h-4v-1h4zm-8-11v12h-1v-12h1zm8 9v1h-4v-1h4zm-17-2v2h-1v-2h1zm2 0v2h-1v-2h1zm15 0v1h-4v-1h4zm0-2v1h-4v-1h4zm-8-9h-3v1h3v-1z" />{' '}
					</svg>
					<Button
						disableFocusRipple={true}
						onClick={() => setSelectedHeader('home')}
						style={{ padding: '20px 35px 20px 10px' }}
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
					<svg
						onClick={() => setSelectedHeader('favorites')}
						className={svg}
						width="24"
						height="24"
						viewBox="0 0 26 26"
						xmlns="http://www.w3.org/2000/svg"
						fill={`${selectedHeader === 'favorites' ? 'white' : 'darkgrey'}`}
					>
						<path d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z" />
					</svg>
					<Button
						onClick={() => setSelectedHeader('favorites')}
						style={{ padding: '20px 20px 20px 10px' }}
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
