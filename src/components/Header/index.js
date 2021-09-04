import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { AppBar, Toolbar, makeStyles, Button } from '@material-ui/core';
import Switch from 'react-switch';

import { toggleDegreeUnits } from '../../actions/environmentActions';

import './index.css';

const useStyles = makeStyles(() => ({
	appBar: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
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
	const [isToggleChecked, setIsToggleChecked] = useState(false);
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
		setIsToggleChecked(!isToggleChecked);
		dispatch(toggleDegreeUnits());
	};

	return (
		<div className="header-wrapper">
			<AppBar className={appBar}>
				<Toolbar className={webTitle}>Herolo Weather Task</Toolbar>
				<div className="example">
					<Switch
						onChange={onClickToggle}
						width={55}
						checked={isToggleChecked}
						uncheckedIcon={
							<div className="check">
								<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24">
									<path d="M6 7c.551 0 1 .449 1 1s-.449 1-1 1c-.551 0-1-.449-1-1s.449-1 1-1zm0-1c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm11.984 7.949c-.091 1.257-.555 2.246-1.392 2.968-.836.722-1.939 1.083-3.309 1.083-1.497 0-2.675-.504-3.533-1.512-.858-1.008-1.287-2.392-1.287-4.151v-.714c0-1.123.198-2.112.593-2.968.396-.855.961-1.512 1.697-1.969.735-.457 1.589-.686 2.562-.686 1.348 0 2.433.361 3.257 1.083.824.722 1.299 1.735 1.428 3.04h-2.406c-.059-.754-.269-1.301-.63-1.64-.361-.34-.91-.509-1.648-.509-.802 0-1.402.288-1.801.862-.398.575-.603 1.467-.614 2.675v.882c0 1.262.191 2.185.573 2.767.382.583.985.874 1.809.874.743 0 1.298-.17 1.664-.509.366-.34.576-.865.63-1.576h2.407zm-5.984-11.949c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z" />
								</svg>
							</div>
						}
						checkedIcon={
							<div className="check">
								<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24">
									<path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-5 7c.551 0 1 .449 1 1s-.449 1-1 1-1-.449-1-1 .449-1 1-1zm0-1c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm9.857 7.096h-4.385v4.904h-2.472v-12h7.352v2.003h-4.879v3.099h4.385v1.994z" />
								</svg>
							</div>
						}
					/>
				</div>
				<div className={menuButtons}>
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
