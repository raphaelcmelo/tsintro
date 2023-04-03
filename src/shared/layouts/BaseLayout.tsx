import { Icon, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDrawerContext } from '../contexts';

interface IBaseLayoutProps {
  title: string;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
}

export const BaseLayout: React.FC<IBaseLayoutProps> = ({ children, title, toolbar }) => {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const { toggleDrawerOpen } = useDrawerContext();

	return (
		<Box height='100%' display="flex" flexDirection="column" gap={1}>
			<Box padding={1} height={theme.spacing(12)} display="flex" alignItems="center" gap={1}>
				{smDown && (
					<IconButton onClick={toggleDrawerOpen}>
						<Icon>menu</Icon>
					</IconButton>)}

				<Typography variant='h5'>
					{title}
				</Typography>
			</Box>

			<Box>
				{toolbar}
			</Box>

			<Box>
				{children}
			</Box>
		</Box>
	);
};
