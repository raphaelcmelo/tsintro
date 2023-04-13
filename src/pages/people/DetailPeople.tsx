import { useNavigate, useParams } from 'react-router-dom';

import { BaseLayout } from '../../shared/layouts';
import { DetailsTools } from '../../shared/components';



export const DetailPeople: React.FC = () => {
	const { id = 'new' } = useParams<'id'>();
	const navigate = useNavigate();

	const handleSave = () => {
		console.log('Save');
	};

	const handleDelete = () => {
		console.log('SaDeleteve');
	};

	return (
		<BaseLayout
			title='Detalhe de Pessoa'
			toolbar={
				<DetailsTools
					textNewButton='Nova'
					showSaveAndCloseButton
					showNewButton={id !== 'new'}
					showRemoveButton={id !== 'new'}

					onClickSave={() => handleSave}
					onClickSaveAndClose={() => handleSave}
					onClickRemove={() => handleDelete}
					onClickNew={() => navigate('/people/detail/new')}
					onClickBack={() => navigate('/people')}
				/>}
		>
			<p>DetailPeople {id}</p>
		</BaseLayout>
	);
};
