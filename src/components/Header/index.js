import { AppBar, Toolbar, makeStyles, Button } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import './index.css';

const headersData = [
	{
		label: 'Home',
		href: '/',
	},
	{
		label: 'Favorites',
		href: '/favorites',
	},
];

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
		fontSize: '15px',
		padding: '20px',
		fontFamily: 'Montserrat, Roboto, OpenSans',
	},
	menuButtonSelected: {
		display: 'flex',
		fontSize: '25px',
		padding: '20px',
		color: 'red',
		fontFamily: 'Montserrat, Roboto, OpenSans',
	},
}));

const Header = () => {
	const { menuButtons, menuButton, menuButtonSelected, webTitle, appBar } = useStyles();

	const getWebTitle = () => {
		return <Toolbar className={webTitle}>Herolo Weather Task</Toolbar>;
	};

	const getMenuButtons = () => {
		return headersData.map(({ label, href }) => {
			return (
				<Button
					{...{
						key: label,
						color: 'inherit',
						to: href,
						component: RouterLink,
						className: window.location.pathname.includes('favorites') ? menuButtonSelected : menuButton,
					}}
				>
					{label}
				</Button>
			);
		});
	};

	return (
		<div className="header-wrapper">
			<AppBar className={appBar}>
				{getWebTitle()}
				<div className={menuButtons}>{getMenuButtons()}</div>
			</AppBar>
		</div>
	);
};

export default Header;
