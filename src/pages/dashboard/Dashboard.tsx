import { ListTools } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';

export const Dashboard = () => {
	return (
		<BaseLayout
			title='Título da página'
			toolbar={(
				<ListTools
					showSearchInput
				/>
			)}>
      Testando
		</BaseLayout>
	);
};
