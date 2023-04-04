import { Box, Button, Icon, InputAdornment, Paper, TextField, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

interface IListTools {
	textSearch?: string;
	showSearchInput?: boolean;
	onChangeTextSearch?: (newText: string) => void;
	textNewButton?: string;
  showNewButton?: boolean;
  clickOnNew?: () => void;
}

export const ListTools: React.FC<IListTools> = ({
	textSearch = '',
	onChangeTextSearch,
	showSearchInput = false,
	textNewButton = 'Novo',
	showNewButton = true,
	clickOnNew
}) => {
	const theme = useTheme();

	return (
		<Box
			gap={1}
			marginX={1}
			padding={1}
			paddingX={2}
			display="flex"
			alignItems="center"
			height={theme.spacing(5)}
			component={Paper}
		>
			{showSearchInput &&(
				<TextField
					size='small'
					value={textSearch}
					onChange={(e) => onChangeTextSearch?.(e.target.value)}
					placeholder='Pesquisar...'
					InputProps={{
						startAdornment: (
							<InputAdornment
								position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>)}

			<Box
				flex={1}
				display='flex'
				justifyContent='end'
			>
				{showNewButton && (
					<Button
						variant='contained'
						disableElevation
						endIcon={<Icon>add</Icon>}
						onClick={clickOnNew}
					>
						{textNewButton}
					</Button>)}
			</Box>
		</Box>
	);
};

ListTools.propTypes = {
	textSearch: PropTypes.string,
	showSearchInput: PropTypes.bool,
	onChangeTextSearch: PropTypes.func,
	textNewButton: PropTypes.string,
	showNewButton: PropTypes.bool,
	clickOnNew: PropTypes.func,
};

