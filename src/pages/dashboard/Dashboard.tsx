import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { ListTools } from '../../shared/components';
import { BaseLayout } from '../../shared/layouts';
import { useEffect, useState } from 'react';
import { PeopleService } from '../../shared/services/api/people/PeopleService';
import { CityService } from '../../shared/services/api/city/CityService';

export const Dashboard = () => {
	const [isPeopleLoading, setIsPeopleLoading] = useState(false);
	const [isCityLoading, setIsCityLoading] = useState(false);
	const [peopleTotalCount, setPeopleTotalCount] = useState(0);
	const [cityTotalCount, setCityTotalCount] = useState(0);

	useEffect(() => {
		setIsPeopleLoading(true);
		setIsCityLoading(true);


		PeopleService.getAll(1)
			.then((result) => {
				setIsPeopleLoading(false);

				if (result instanceof Error) {
					alert(result.message);
				} else {
					setPeopleTotalCount(result.totalCount);
				}
			});
		CityService.getAll(1)
			.then((result) => {
				setIsCityLoading(false);

				if (result instanceof Error) {
					alert(result.message);
				} else {
					setCityTotalCount(result.totalCount);
				}
			});
	}, []);

	return (
		<BaseLayout
			title='Dashboard'
			toolbar={<ListTools showNewButton={false} />}
		>
			<Box width='100%' display='flex'>
				<Grid container margin={1.25}>
					<Grid container item spacing={2}>
						<Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
							<Card>
								<CardContent>
									<Typography variant='h5' align='center'>
                    Total de pessoas
									</Typography>
									<Box padding={6} justifyContent='center' alignItems='center'>
										{!isPeopleLoading && (<Typography variant='h1' align='center'>
											{peopleTotalCount}
										</Typography>)}
										{isPeopleLoading &&(
											<Typography variant='h4' align='center'>
											Carregando...
											</Typography>
										)}
									</Box>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
							<Card>
								<CardContent>
									<Typography variant='h5' align='center'>
                    Total de cidades
									</Typography>
									<Box padding={6} justifyContent='center' alignItems='center'>
										{!isCityLoading && (<Typography variant='h1' align='center'>
											{cityTotalCount}
										</Typography>)}
										{isCityLoading && (<Typography variant='h4' align='center'>
											Carregando
										</Typography>)}
									</Box>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</BaseLayout>
	);
};
