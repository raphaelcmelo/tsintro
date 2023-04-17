import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

import { BaseLayout } from '../../shared/layouts';
import { DetailsTools } from '../../shared/components';
import { CityService } from '../../shared/services/api/city/CityService';
import { IVFormErrors, VTextField } from '../../shared/forms';

interface IFormData {
  name: string,
}
const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
	name: yup.string().required().min(3),
});

export const DetailCity: React.FC = () => {
	const { id = 'new' } = useParams<'id'>();
	const navigate = useNavigate();

	const formRef = useRef<FormHandles>(null);

	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState('');

	useEffect(() => {
		if (id !== 'new') {
			setIsLoading(true);

			CityService.getById(Number(id))
				.then((result) => {
					setIsLoading(false);
					if(result instanceof Error) {
						alert(result.message);
						navigate('/city');
					} else {
						setTitle(result.name);
						formRef.current?.setData(result);
					}
				});
		} else {
			formRef.current?.setData({
				name: ''
			});
		}
	}, [id]);


	const handleSave = (cityData: IFormData) => {
		formValidationSchema.
			validate(cityData, { abortEarly: false })
			.then((validatedData: IFormData) => {
				setIsLoading(true);

				if (id === 'new') {
					CityService
						.create(validatedData)
						.then((result) => {
							setIsLoading(false);
							if (result instanceof Error) {
								alert(result.message);
							} else {
								navigate(`/city/detail/${result}`);
							}
						});
				} else {
					CityService
						.update(Number(id), {id: Number(id), ...validatedData})
						.then((result) => {
							setIsLoading(false);
							if (result instanceof Error) {
								alert(result.message);
							}
						});
				}
			})
			.catch((errors: yup.ValidationError) => {
				const validationErrors: IVFormErrors = {};

				errors.inner.forEach(error => {
					if (!error.path) return;

					validationErrors[error.path] = error.message;
				});
				formRef.current?.setErrors(validationErrors);
			});
	};

	const handleDelete = (id: number) => {
		if (confirm('Tem certeza que deseja excluir o registro? Essa ação não poderá ser desfeita!')) {
			CityService.deleteById(id)
				.then(result => {
					if (result instanceof Error) {
						alert(result.message);
					} else {
						alert('Registro excluído com sucesso!');
						navigate('/city');
					}
				});
		}
	};

	return (
		<BaseLayout
			title={ id === 'new' ? 'Nova cidade' : title }
			toolbar={
				<DetailsTools
					textNewButton='Nova'
					showSaveAndCloseButton
					showNewButton={id !== 'new'}
					showRemoveButton={id !== 'new'}

					onClickSave={() => formRef.current?.submitForm()}
					onClickSaveAndClose={() => formRef.current?.submitForm()}
					onClickRemove={() => handleDelete(Number(id))}
					onClickNew={() => navigate('/city/detail/new')}
					onClickBack={() => navigate('/city')}
				/>}
		>
			<Form ref={formRef} onSubmit={handleSave}>
				<Box margin={1} display="flex" flexDirection='column' component={Paper} variant='outlined'>

					<Grid container direction='column' padding={2} spacing={2}>

						{isLoading && (
							<Grid item>
								<LinearProgress variant='indeterminate' />
							</Grid>
						)}

						<Grid item>
							<Typography variant='h6'>
                Geral
							</Typography>
						</Grid>

						<Grid container item direction='row' spacing={2}>
							<Grid item xs={12} sm={8} md={6} lg={4} xl={2}>
								<VTextField
									fullWidth
									label='Nome'
									name='name'
									disabled={isLoading}
									onChange={e => setTitle(e.target.value)}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Form>
		</BaseLayout>
	);
};
