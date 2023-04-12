import { useSearchParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

import { PeopleService } from '../../shared/services/api/people/PeopleService';
import { ListTools } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';

export const PeopleList: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const find = useMemo(() => {
		return searchParams.get('find') || '';
	}, [searchParams]);

	useEffect(() => {
		PeopleService.getAll(1, find)
			.then((result) => {
				if (result instanceof Error) {
					alert(result.message);
				} else {
					console.log(result);
				}
			});
	}, [find]);

	return (
		<BaseLayout
			title="Listagem de pessoas"
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


