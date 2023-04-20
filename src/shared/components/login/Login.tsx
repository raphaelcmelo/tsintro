import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';

import { useAuthContext } from '../../contexts';

const loginSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required().min(6)
});

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
	const { isAuthenticated, login } = useAuthContext();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const [isLoading, setIsLoading] = useState(false);


	const handleSubmit = () => {
		setIsLoading(true);

		loginSchema.validate({email, password}, { abortEarly: false })
			.then(validatedData => {
				login(validatedData.email, validatedData.password)
					.then(() => {
						setIsLoading(false);
					});
			})
			.catch((errors: yup.ValidationError) => {
				setIsLoading(false);
				errors.inner.forEach(error => {
					if (error.path === 'email') {
						setEmailError(error.message);
					} else if (error.path === 'password') {
						setPasswordError(error.message);
					}
				});
			});
	};

	if(isAuthenticated) return(
		<>
			{children}
		</>
	);
	return (
		<Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
			<Card>
				<CardContent>
					<Box display='flex' flexDirection='column' gap={2} width='250px'>
						<Typography variant='h6' align='center'>
              Identifique-se
						</Typography>
						<TextField
							fullWidth
							label='Email'
							type='email'
							value={email}
							onChange={e => setEmail(e.target.value) }
							onKeyDown={() => setEmailError('') }
							error={!!emailError}
							helperText={emailError}
							disabled={isLoading}
						/>

						<TextField
							fullWidth
							label='Senha'
							type='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							error={!!passwordError}
							helperText={passwordError}
							disabled={isLoading}
						/>
					</Box>
				</CardContent>
				<CardActions>
					<Box width='100%' display='flex' justifyContent='center'>
						<Button
							variant='contained'
							onClick={handleSubmit}
							endIcon={isLoading ? <CircularProgress color='inherit' variant='indeterminate' size={20}/> : undefined}
						>
              Entrar
						</Button>
					</Box>
				</CardActions>
			</Card>
		</Box>
	);
};

Login.propTypes = {
	children: PropTypes.node.isRequired,
};
