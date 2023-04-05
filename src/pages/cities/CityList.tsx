import { useSearchParams } from 'react-router-dom';

import { ListTools } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { useMemo } from 'react';

export const CityList: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const find = useMemo(() => {
		return searchParams.get('busca') || '';
	}, [searchParams]);

	return (
		<BaseLayout
			title="Listagem de cidades"
			toolbar={
				<ListTools
					showSearchInput={true}
					textNewButton='Nova'
					textSearch={find}
					onChangeTextSearch={text => setSearchParams({ find: text }, { replace: true })}
				/>
			}
		>

		</BaseLayout>
	);
};


