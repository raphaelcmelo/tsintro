import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';


import { BaseLayout } from '../../shared/layouts';
import { DetailsTools } from '../../shared/components';
import { PeopleService } from '../../shared/services/api/people/PeopleService';
import { LinearProgress } from '@mui/material';
import { VTextField } from '../../shared/forms';

interface IFormData {
  email: string,
  fullName: string,
  cityId: number
}

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
		}
	}, [id]);


	const handleSave = (userData: IFormData) => {
		setIsLoading(true);
		if (id === 'new') {
			PeopleService
				.create(userData)
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
				.update(Number(id), {id: Number(id), ...userData})
				.then((result) => {
					setIsLoading(false);
					if (result instanceof Error) {
						alert(result.message);
					}
				});
		}
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
			{isLoading && (
				<LinearProgress variant='indeterminate' />
			)}
			<Form ref={formRef} onSubmit={handleSave}>
				<VTextField placeholder='Nome completo' name='fullName'/>
				<VTextField placeholder='Email' name='email'/>
				<VTextField placeholder='Cidade' name='cityId'/>

			</Form>
		</BaseLayout>
	);
};
