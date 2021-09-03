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
	menuLeft: {
		display: 'flex',
		paddingLeft: '50px',
		fontWeight: 700,
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
}));

const Header = () => {
	const { menuButtons, menuButton, menuLeft, appBar } = useStyles();

	const webTitle = () => {
		return <Toolbar className={menuLeft}>Herolo Weather Task</Toolbar>;
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
						className: menuButton,
					}}
				>
					{label}
				</Button>
			);
		});
	};

	return (
		<div className="header-wrapper" style={{ height: '10%' }}>
			<AppBar className={appBar}>
				{webTitle()}
				<div className={menuButtons}>{getMenuButtons()}</div>
			</AppBar>
		</div>
	);
};

export default Header;
