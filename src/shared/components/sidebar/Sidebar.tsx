import { Avatar, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import { useAppThemeContext, useAuthContext, useDrawerContext } from '../../contexts';
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
		onClick?.();
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
	const { toggleTheme, themeName } = useAppThemeContext();
	const { logout } = useAuthContext();

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
					<Box>
						<List component="nav">
							<ListItemButton onClick={toggleTheme}>
								<ListItemIcon>
									<Icon>
										{themeName === 'dark' ? 'light_mode' : 'dark_mode' }
									</Icon>
								</ListItemIcon>
								<ListItemText primary={themeName === 'dark' ? 'Modo claro' : 'Modo escuro'} />
							</ListItemButton>
							<ListItemButton onClick={logout}>
								<ListItemIcon>
									<Icon>
										logout
									</Icon>
								</ListItemIcon>
								<ListItemText primary='Sair' />
							</ListItemButton>
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
	icon: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
	onClick: PropTypes.func,
};
