import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

import { BaseLayout } from '../../shared/layouts';
import { DetailsTools } from '../../shared/components';
import { PeopleService } from '../../shared/services/api/people/PeopleService';
import { IVFormErrors, VTextField } from '../../shared/forms';
import { AutoCompleteCity } from './components/AutoCompleteCity';

interface IFormData {
  email: string,
  fullName: string,
  cityId: number
}
const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
	email: yup.string().required('O campo é obrigatório').email('O email informado não é válido.'),
	fullName: yup.string().required('O campo é obrigatório').min(3, 'O campo precisa ter pelo menos 3 caracteres.'),
	cityId: yup.number().required('O campo é obrigatório')
});

export const DetailPeople: React.FC = () => {
	const { id = 'new' } = useParams<'id'>();
	const navigate = useNavigate();

	const formRef = useRef<FormHandles>(null);

	const [isLoading, setIsLoading] = useState(false);
	const [title, setTitle] = useState('');

	useEffect(() => {
		if (id !== 'new') {
			setIsLoading(true);

			PeopleService.getById(Number(id))
				.then((result) => {
					setIsLoading(false);
					if(result instanceof Error) {
						alert(result.message);
						navigate('/people');
					} else {
						setTitle(result.fullName);
						formRef.current?.setData(result);
					}
				});
		} else {
			formRef.current?.setData({
				email: '',
				cityId: '',
				fullName: ''
			});
		}
	}, [id]);


	const handleSave = (userData: IFormData) => {
		formValidationSchema.
			validate(userData, { abortEarly: false })
			.then((validatedData: IFormData) => {
				setIsLoading(true);

				if (id === 'new') {
					PeopleService
						.create(validatedData)
						.then((result) => {
							setIsLoading(false);
							if (result instanceof Error) {
								alert(result.message);
							} else {
								navigate(`/people/detail/${result}`);
							}
						});
				} else {
					PeopleService
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
			PeopleService.deleteById(id)
				.then(result => {
					if (result instanceof Error) {
						alert(result.message);
					} else {
						alert('Registro excluído com sucesso!');
						navigate('/people');
					}
				});
		}
	};

	return (
		<BaseLayout
			title={ id === 'new' ? 'Nova pessoa' : title }
			toolbar={
				<DetailsTools
					textNewButton='Nova'
					showSaveAndCloseButton
					showNewButton={id !== 'new'}
					showRemoveButton={id !== 'new'}

					onClickSave={() => formRef.current?.submitForm()}
					onClickSaveAndClose={() => formRef.current?.submitForm()}
					onClickRemove={() => handleDelete(Number(id))}
					onClickNew={() => navigate('/people/detail/new')}
					onClickBack={() => navigate('/people')}
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
									label='Nome completo'
									name='fullName'
									disabled={isLoading}
									onChange={e => setTitle(e.target.value)}
								/>
							</Grid>
						</Grid>

						<Grid container item direction='row' spacing={2}>
							<Grid item  xs={12} sm={8} md={6} lg={4} xl={2}>
								<VTextField
									fullWidth
									label='Email'
									name='email'
									disabled={isLoading}
								/>
							</Grid>
						</Grid>

						<Grid container item direction='row' spacing={2}>
							<Grid item  xs={12} sm={8} md={6} lg={4} xl={2}>
								<AutoCompleteCity />
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Form>
		</BaseLayout>
	);
};
