import { Routes, Route, Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAppThemeContext, useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import {
	Dashboard,
	CityList
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
				path: '/cities',
				label: 'Cidades'
			}
		]);
	}, []);

	const { toggleTheme } = useAppThemeContext();
	return(
		<Routes>
			{/* <Route path='/home' element={<><Button variant='contained' color='primary' onClick={toggleDrawerOpen}>TOGGLE DRAWER</Button><Button variant='contained' color='primary' onClick={toggleTheme}>TOGGLE THEME</Button></>}/> */}
			{/* <Route path='*' element={<Navigate to={'/home'} />} /> */}
			<Route path='/home' element={<Dashboard />}/>
			<Route path='/cities' element={<CityList />}/>
			{/* <Route path='/cities/detail/:id' element={<CityList />}/> */}
		</Routes>
	);
};
