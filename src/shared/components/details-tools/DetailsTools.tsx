import { Box, useTheme, Paper, Button, Icon, Divider } from '@mui/material';
import PropTypes from 'prop-types';

interface IDetailsToolsProps {
  textNewButton?: string,

  showNewButton?: boolean,
  showBackButton?: boolean,
  showRemoveButton?: boolean,
  showSaveButton?: boolean,
  showSavenCloseButton?: boolean,

  onClickNew?: () => void,
  onClickBack?: () => void,
  onClickRemove?: () => void,
  onClickSave?: () => void,
  onClickSavenClose?: () => void,
}

export const DetailsTools: React.FC<IDetailsToolsProps> = ({
	textNewButton = 'Novo',

	showNewButton = true,
	showBackButton = true,
	showRemoveButton = true,
	showSaveButton = true,
	showSavenCloseButton = false,
	onClickNew,
	onClickBack,
	onClickRemove,
	onClickSave,
	onClickSavenClose,
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
			{showSaveButton &&(
				<Button
					color='primary'
					disableElevation
					variant='contained'
					startIcon={<Icon>save</Icon>}
					onClick={onClickSave}
				>
          Salvar
				</Button>)}
			{showSavenCloseButton &&(
				<Button
					color='secondary'
					disableElevation
					variant='outlined'
					onClick={onClickSavenClose}
					startIcon={<Icon>save</Icon>}
				>
          Salvar e voltar
				</Button>)}
			{showRemoveButton &&(
				<Button
					color='warning'
					disableElevation
					variant='outlined'
					onClick={onClickRemove}
					startIcon={<Icon>delete</Icon>}
				>
          Apagar
				</Button>)}
			{showNewButton && (
				<Button
					color='warning'
					disableElevation
					variant='outlined'
					onClick={onClickNew}
					startIcon={<Icon>add</Icon>}
				>
					{textNewButton}
				</Button>
			)}
			<Divider variant='middle' orientation='vertical' />

			{showBackButton &&(
				<Button
					color='warning'
					disableElevation
					variant='outlined'
					onClick={onClickBack}
					startIcon={<Icon>arrow_back</Icon>}
				>
          Voltar
				</Button>)}
		</Box>
	);
};

DetailsTools.propTypes = {
	textNewButton: PropTypes.string.isRequired,
	showNewButton: PropTypes.bool,
	showBackButton: PropTypes.bool,
	showRemoveButton: PropTypes.bool,
	showSaveButton: PropTypes.bool,
	showSavenCloseButton: PropTypes.bool,
	onClickNew: PropTypes.func,
	onClickBack: PropTypes.func,
	onClickRemove: PropTypes.func,
	onClickSave: PropTypes.func,
	onClickSavenClose: PropTypes.func
};
