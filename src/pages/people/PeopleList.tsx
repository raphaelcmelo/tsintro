import { useEffect, useMemo, useState } from 'react';
import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { IListPeople, PeopleService } from '../../shared/services/api/people/PeopleService';
import { ListTools } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../environment';

export const PeopleList: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { debounce } = useDebounce();

	const [rows, setRows] = useState<IListPeople[]> ([]);
	const [totalCount, setTotalCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);


	const find = useMemo(() => {
		return searchParams.get('find') || '';
	}, [searchParams]);

	useEffect(() => {
		setIsLoading(true);

		debounce(() => {
			PeopleService.getAll(1, find)
				.then((result) => {
					setIsLoading(false);

					if (result instanceof Error) {
						alert(result.message);
					} else {
						console.log(result);

						setTotalCount(result.totalCount);
						setRows(result.data);
					}
				});
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
			<TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Ações</TableCell>
							<TableCell>Nome completo</TableCell>
							<TableCell>Email</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(row => (
							<TableRow key={row.id}>
								<TableCell>Ações</TableCell>
								<TableCell>{row.fullName}</TableCell>
								<TableCell>{row.email}</TableCell>
							</TableRow>
						))}
					</TableBody>

					{totalCount === 0 && !isLoading && (
						<caption>{Environment.EMPTY_LIST}</caption>
					)}

					<TableFooter>
						{isLoading && (
							<TableRow>
								<TableCell colSpan={3}>
									<LinearProgress variant='indeterminate'/>
								</TableCell>
							</TableRow>
						)}
					</TableFooter>
				</Table>
			</TableContainer>
		</BaseLayout>
	);
};


