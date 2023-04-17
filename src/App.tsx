import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { Sidebar } from './shared/components';

import './shared/forms/TranslationsYup';

export const App = () => {

	return (
		<AppThemeProvider>
			<DrawerProvider>
				<BrowserRouter>
					<Sidebar>
						<AppRoutes />
					</Sidebar>
				</BrowserRouter>
			</DrawerProvider>
		</AppThemeProvider>
	);
};


