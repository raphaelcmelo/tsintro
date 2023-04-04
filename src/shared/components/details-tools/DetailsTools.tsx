import { Box, useTheme, Paper, Button, Icon, Divider } from '@mui/material';

export const DetailsTools: React.FC = () => {
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
			<Button
				color='primary'
				disableElevation
				variant='contained'
				startIcon={<Icon>save</Icon>}
			>
          Salvar
			</Button>
			<Button
				color='secondary'
				disableElevation
				variant='outlined'
				startIcon={<Icon>save</Icon>}
			>
          Salvar e voltar
			</Button>
			<Button
				color='warning'
				disableElevation
				variant='outlined'
				startIcon={<Icon>delete</Icon>}
			>
          Apagar
			</Button>
			<Button
				color='warning'
				disableElevation
				variant='outlined'
				startIcon={<Icon>add</Icon>}
			>
          Novo
			</Button>

			<Divider variant='middle' orientation='vertical' />

			<Button
				color='warning'
				disableElevation
				variant='outlined'
				startIcon={<Icon>arrow_back</Icon>}
			>
          Voltar
			</Button>
		</Box>
	);
};
