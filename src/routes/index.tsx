import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppThemeContext, useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import {
	CityList,
	Dashboard,
	DetailCity,
	DetailPeople,
	PeopleList
} from '../pages';

export const AppRoutes = () => {
	const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

	useEffect(() => {
		setDrawerOptions([
			{
				icon: 'home',
				path: '/home',
				label: 'Página inicial'
			},
			{
				icon: 'location_city',
				path: '/city',
				label: 'Cidades'
			},
			{
				icon: 'people',
				path: '/people',
				label: 'Pessoas'
			}
		]);
	}, []);

	const { toggleTheme } = useAppThemeContext();
	return(
		<Routes>
			{/* <Route path='/home' element={<><Button variant='contained' color='primary' onClick={toggleDrawerOpen}>TOGGLE DRAWER</Button><Button variant='contained' color='primary' onClick={toggleTheme}>TOGGLE THEME</Button></>}/> */}
			<Route path='/home' element={<Dashboard />}/>
			{/* <Route path='*' element={<Navigate to={'/home'} />} /> */}
			<Route path='/people' element={<PeopleList />}/>
			<Route path='/people/detail/:id' element={<DetailPeople />}/>

			<Route path='/city' element={<CityList />}/>
			<Route path='/city/detail/:id' element={<DetailCity />}/>

			{/* <Route path='/cities/detail/:id' element={<CityList />}/> */}
		</Routes>
	);
};
