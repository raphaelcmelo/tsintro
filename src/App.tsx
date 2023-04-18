import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';
import { Login, Sidebar } from './shared/components';

import './shared/forms/TranslationsYup';

export const App = () => {

	return (
		<AuthProvider>
			<AppThemeProvider>
				<Login>
					<DrawerProvider>
						<BrowserRouter>
							<Sidebar>
								<AppRoutes />
							</Sidebar>
						</BrowserRouter>
					</DrawerProvider>
				</Login>
			</AppThemeProvider>
		</AuthProvider>
	);
};


