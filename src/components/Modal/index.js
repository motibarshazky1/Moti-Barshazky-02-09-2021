import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 2, 2),
		width: '45%',
		height: '40%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
		display: 'flex',
		flexDirection: 'column',
	},
	errorTitle: {
		fontSize: '20px',
		marginBottom: '15px',
		color: 'red',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	errorMsg: {
		fontSize: '20px',
		marginBottom: '40px',
		textAlign: 'center',
	},
}));

const AppModal = ({ open, onClose, errMsg, errTitle }) => {
	const classes = useStyles();

	return (
		<div>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={open}
				onClose={onClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="42"
							height="42"
							viewBox="0 0 24 24"
							style={{ marginBottom: '20px' }}
						>
							<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.5 5h3l-1 10h-1l-1-10zm1.5 14.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z" />{' '}
						</svg>
						<label className={classes.errorTitle}>{errTitle}</label>
						<label className={classes.errorMsg}>{errMsg}</label>
						<Button
							variant="outlined"
							color="secondary"
							onClick={onClose}
							style={{ fontFamily: 'Montserrat, Roboto, OpenSans' }}
						>
							Close
						</Button>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default AppModal;
