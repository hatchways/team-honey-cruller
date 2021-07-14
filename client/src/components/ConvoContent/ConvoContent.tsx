import { useState } from 'react';
import { Box, Typography } from "@material-ui/core";
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import Chip from "@material-ui/core/Chip";

const ConvoContent = (): JSX.Element => {
	const classes = useStyles();
  const [unread, setUnread] = useState<number>(0)
    const { loggedInUser } = useAuth();


	return (
		<Box className={classes.root} onClick={() => setUnread(0)}>
			<Box>
				<Typography className={classes.username}>
					Other username here
				</Typography>
				<Typography className={classes.previewText}>
					Most recent message here
				</Typography>
			</Box>
			{unread ? (
				<Chip color='primary' label={unread} className={classes.chip} />
			) : null}
		</Box>
	);
};

export default ConvoContent;