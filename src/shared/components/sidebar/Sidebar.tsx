import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface IListItemLinkProps {
  label: string;
  icon: string;
  to: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, label, icon, onClick }) => {
	const navigate = useNavigate();

	const resolvedPath = useResolvedPath(to);
	const match = useMatch({ path: resolvedPath.pathname, end: false });

	const handleClick = () => {
		navigate(to);
		onclick?.();
	};

	return(
		<ListItemButton selected={!!match} onClick={handleClick}>
			<ListItemIcon>
				<Icon>
					{icon}
				</Icon>
			</ListItemIcon>
			<ListItemText primary={label} />
		</ListItemButton>
	);
};

interface ISidebarProps{
  children: React.ReactNode
}

export const Sidebar: React.FC<ISidebarProps> = ({ children }) => {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));

	const {isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

	return (
		<>
			<Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
				<Box height="100%" width={theme.spacing(28)} display="flex" flexDirection="column">
					<Box width="100%" height={theme.spacing(20)} display="flex" alignItems="center" justifyContent="center">
						<Avatar
							sx={{ height: theme.spacing(12), width: theme.spacing(12)}}
							src="https://avatars.githubusercontent.com/u/33152612?v=4" />
					</Box>

					<Divider />
					<Box flex={1}>
						<List component="nav">
							{drawerOptions.map(drawerOption => (
								<ListItemLink
									key={drawerOption.path}
									icon={drawerOption.icon}
									to={drawerOption.path}
									label={drawerOption.label}
									onClick={toggleDrawerOpen}
								/>))}
						</List>
					</Box>

				</Box>
			</Drawer>

			<Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
				{children}
			</Box>
		</>
	);
};

Sidebar.propTypes = {
	children: PropTypes.node.isRequired,
};

ListItemLink.propTypes = {
	icon: PropTypes.string,
	label: PropTypes.string,
	to: PropTypes.string,
	onClick: PropTypes.string
};
