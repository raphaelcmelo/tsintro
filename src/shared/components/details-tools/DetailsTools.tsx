import { Box, useTheme, Paper, Button, Icon, Divider, Skeleton, Typography, useMediaQuery, Theme } from '@mui/material';
import PropTypes from 'prop-types';

interface IDetailsToolsProps {
  textNewButton?: string,

  showNewButton?: boolean,
  showBackButton?: boolean,
  showRemoveButton?: boolean,
  showSaveButton?: boolean,
  showSaveAndCloseButton?: boolean,

  showNewButtonLoading?: boolean,
  showBackButtonLoading?: boolean,
  showRemoveButtonLoading?: boolean,
  showSaveButtonLoading?: boolean,
  showSaveAndCloseButtonLoading?: boolean,

  onClickNew?: () => void,
  onClickBack?: () => void,
  onClickRemove?: () => void,
  onClickSave?: () => void,
  onClickSaveAndClose?: () => void,
}

export const DetailsTools: React.FC<IDetailsToolsProps> = ({
	textNewButton = 'Novo',

	showNewButton = true,
	showBackButton = true,
	showRemoveButton = true,
	showSaveButton = true,
	showSaveAndCloseButton: showSaveAndCloseButton = false,

	showNewButtonLoading = false,
	showBackButtonLoading = false,
	showRemoveButtonLoading = false,
	showSaveButtonLoading = false,
	showSaveAndCloseButtonLoading = false,

	onClickNew,
	onClickBack,
	onClickRemove,
	onClickSave,
	onClickSaveAndClose,
}) => {
	const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

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
					<Typography
						variant='button'
						whiteSpace='nowrap'
						textOverflow='ellipsis'
						overflow='hidden'
					>
            Salvar
					</Typography>
				</Button>)}

			{showSaveButtonLoading &&(<Skeleton width={110} height={64}></Skeleton>)}

			{(showSaveAndCloseButton && !showSaveAndCloseButtonLoading && !smDown && !mdDown)  &&(
				<Button
					color='secondary'
					disableElevation
					variant='outlined'
					onClick={onClickSaveAndClose}
					startIcon={<Icon>save</Icon>}
				>
					<Typography
						variant='button'
						whiteSpace='nowrap'
						textOverflow='ellipsis'
						overflow='hidden'
					>
          Salvar e fechar
					</Typography>
				</Button>)}

			{(showSaveAndCloseButtonLoading && !smDown && !mdDown) &&(<Skeleton width={180} height={64}></Skeleton>)}

			{(showRemoveButton && !showRemoveButtonLoading) &&(
				<Button
					color='warning'
					disableElevation
					variant='outlined'
					onClick={onClickRemove}
					startIcon={<Icon>delete</Icon>}
				>
					<Typography
						variant='button'
						whiteSpace='nowrap'
						textOverflow='ellipsis'
						overflow='hidden'
					>
          Apagar
					</Typography>
				</Button>)}

			{showRemoveButtonLoading &&(<Skeleton width={110} height={64}></Skeleton>)}

			{(showNewButton && !showNewButtonLoading && !smDown) && (
				<Button
					color='warning'
					disableElevation
					variant='outlined'
					onClick={onClickNew}
					startIcon={<Icon>add</Icon>}
				>
					<Typography
						variant='button'
						whiteSpace='nowrap'
						textOverflow='ellipsis'
						overflow='hidden'
					>
						{textNewButton}
					</Typography>
				</Button>
			)}

			{(showNewButtonLoading && !smDown) && (<Skeleton width={110} height={64}></Skeleton>)}

			{
				(showBackButton &&
      ((showNewButton || showRemoveButton || showSaveButton || showSaveAndCloseButton)
      ) &&
				<Divider variant='middle' orientation='vertical' />
				)}

			{(showBackButton && !showBackButtonLoading) &&(
				<Button
					color='warning'
					disableElevation
					variant='outlined'
					onClick={onClickBack}
					startIcon={<Icon>arrow_back</Icon>}
				>
					<Typography
						variant='button'
						whiteSpace='nowrap'
						textOverflow='ellipsis'
						overflow='hidden'
					>
          Voltar
					</Typography>
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
	showSaveAndCloseButton: PropTypes.bool,
	showNewButtonLoading: PropTypes.bool,
	showBackButtonLoading: PropTypes.bool,
	showRemoveButtonLoading: PropTypes.bool,
	showSaveButtonLoading: PropTypes.bool,
	showSaveAndCloseButtonLoading: PropTypes.bool,
	onClickNew: PropTypes.func,
	onClickBack: PropTypes.func,
	onClickRemove: PropTypes.func,
	onClickSave: PropTypes.func,
	onClickSaveAndClose: PropTypes.func
};
