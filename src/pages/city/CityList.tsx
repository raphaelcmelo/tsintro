import { useEffect, useMemo, useState } from 'react';
import { Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IListCity, CityService } from '../../shared/services/api/city/CityService';
import { ListTools } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../environment';

export const CityList: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { debounce } = useDebounce();
	const navigate = useNavigate();

	const [rows, setRows] = useState<IListCity[]> ([]);
	const [totalCount, setTotalCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);


	const find = useMemo(() => {
		return searchParams.get('find') || '';
	}, [searchParams]);

	const page = useMemo(() => {
		return Number(searchParams.get('page') || '1');
	}, [searchParams]);

	useEffect(() => {
		setIsLoading(true);

		debounce(() => {
			CityService.getAll(page, find)
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
	}, [find, page]);

	const handleDelete = (id: number) => {

		if (confirm('Tem certeza que deseja excluir o registro? Essa ação não poderá ser desfeita!')) {
			CityService.deleteById(id)
				.then(result => {
					if (result instanceof Error) {
						alert(result.message);
					} else {
						setRows(oldRows => [
							...oldRows.filter(oldRow => oldRow.id !== id),
						]);
						alert('Registro excluído com sucesso!');
					}
				});
		}
	};

	// const handleEdit = (id: number) => {

	// };
	return (
		<BaseLayout
			title="Listagem de pessoas"
			toolbar={
				<ListTools
					showSearchInput={true}
					textNewButton='Nova'
					clickOnNew={() => navigate('/city/detail/new')}
					textSearch={find}
					onChangeTextSearch={text => setSearchParams({ find: text, page: '1' }, { replace: true })}
				/>
			}
		>
			<TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto' }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell width={100}>Ações</TableCell>
							<TableCell>Nome</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(row => (
							<TableRow key={row.id}>
								<TableCell>
									<IconButton size='small'onClick={() => navigate(`/city/detail/${row.id}`)}>
										<Icon>edit</Icon>
									</IconButton>
									<IconButton size='small' onClick={ () => handleDelete(row.id)}>
										<Icon>delete</Icon>
									</IconButton>
								</TableCell>
								<TableCell>{row.name}</TableCell>
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
						{(totalCount > 0 && totalCount > Environment.LINES_LIMIT) && (
							<TableRow>
								<TableCell colSpan={3}>
									<Pagination
										page={page}
										count={Math.ceil(totalCount / Environment.LINES_LIMIT)}
										onChange={(_, newPage) => setSearchParams({ find, page: newPage.toString() }, { replace: true })}
									/>
								</TableCell>
							</TableRow>
						)}
					</TableFooter>
				</Table>
			</TableContainer>
		</BaseLayout>
	);
};


