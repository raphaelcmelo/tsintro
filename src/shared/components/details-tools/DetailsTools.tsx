import { Box, useTheme, Paper, Button, Icon, Divider, Skeleton } from '@mui/material';
import PropTypes from 'prop-types';

interface IDetailsToolsProps {
  textNewButton?: string,

  showNewButton?: boolean,
  showBackButton?: boolean,
  showRemoveButton?: boolean,
  showSaveButton?: boolean,
  showSavenCloseButton?: boolean,

  showNewButtonLoading?: boolean,
  showBackButtonLoading?: boolean,
  showRemoveButtonLoading?: boolean,
  showSaveButtonLoading?: boolean,
  showSavenCloseButtonLoading?: boolean,

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

	showNewButtonLoading = false,
	showBackButtonLoading = false,
	showRemoveButtonLoading = false,
	showSaveButtonLoading = false,
	showSavenCloseButtonLoading = false,

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
			{(showSaveButton && !showSaveButtonLoading) &&(
				<Button
					color='primary'
					disableElevation
					variant='contained'
					startIcon={<Icon>save</Icon>}
					onClick={onClickSave}
				>
          Salvar
				</Button>)}

			{showSaveButtonLoading &&(<Skeleton width={110} height={64}></Skeleton>)}

			{(showSavenCloseButton && !showSavenCloseButtonLoading)  &&(
				<Button
					color='secondary'
					disableElevation
					variant='outlined'
					onClick={onClickSavenClose}
					startIcon={<Icon>save</Icon>}
				>
          Salvar e voltar
				</Button>)}

			{showSavenCloseButtonLoading &&(<Skeleton width={180} height={64}></Skeleton>)}

			{(showRemoveButton && !showRemoveButtonLoading) &&(
				<Button
					color='warning'
					disableElevation
					variant='outlined'
					onClick={onClickRemove}
					startIcon={<Icon>delete</Icon>}
				>
          Apagar
				</Button>)}

			{showRemoveButtonLoading &&(<Skeleton width={110} height={64}></Skeleton>)}

			{(showNewButton && !showNewButtonLoading) && (
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

			{showNewButtonLoading && (<Skeleton width={110} height={64}></Skeleton>)}

			<Divider variant='middle' orientation='vertical' />

			{(showBackButton && !showBackButtonLoading) &&(
				<Button
					color='warning'
					disableElevation
					variant='outlined'
					onClick={onClickBack}
					startIcon={<Icon>arrow_back</Icon>}
				>
          Voltar
				</Button>)}
			{showBackButtonLoading && (<Skeleton width={110} height={64}></Skeleton>)}
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
	showNewButtonLoading: PropTypes.bool,
	showBackButtonLoading: PropTypes.bool,
	showRemoveButtonLoading: PropTypes.bool,
	showSaveButtonLoading: PropTypes.bool,
	showSavenCloseButtonLoading: PropTypes.bool,
	onClickNew: PropTypes.func,
	onClickBack: PropTypes.func,
	onClickRemove: PropTypes.func,
	onClickSave: PropTypes.func,
	onClickSavenClose: PropTypes.func
};
