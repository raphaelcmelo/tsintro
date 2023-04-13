import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


import { BaseLayout } from '../../shared/layouts';
import { DetailsTools } from '../../shared/components';
import { PeopleService } from '../../shared/services/api/people/PeopleService';
import { LinearProgress } from '@mui/material';



export const DetailPeople: React.FC = () => {
	const { id = 'new' } = useParams<'id'>();
	const navigate = useNavigate();

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
						console.log(result);
					}
				});
		}
	}, [id]);


	const handleSave = () => {
		console.log('Save');
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

					onClickSave={() => handleSave}
					onClickSaveAndClose={() => handleSave}
					onClickRemove={() => handleDelete(Number(id))}
					onClickNew={() => navigate('/people/detail/new')}
					onClickBack={() => navigate('/people')}
				/>}
		>
			{isLoading && (
				<LinearProgress variant='indeterminate' />
			)

			}

			<p>DetailPeople {id}</p>
		</BaseLayout>
	);
};
