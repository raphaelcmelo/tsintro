import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { CityService } from '../../../shared/services/api/city/CityService';
import { useDebounce } from '../../../shared/hooks';

type TAutoCompleteOption = {
	id: number;
	label: string;
}

export const AutoCompleteCity: React.FC = () => {
	const { debounce } = useDebounce();
	const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		debounce(() => {
			CityService.getAll(1/* , find */)
				.then((result) => {
					setIsLoading(false);

					if (result instanceof Error) {
						// alert(result.message);
					} else {
						console.log(result);
						setOptions(result.data.map(city => ({id: city.id, label: city.name})));
					}
				});
		});
	});

	return(
		<Autocomplete
			options={[]}
			renderInput={(params) => (
				<TextField
					{...params}
					label='Cidade'
				/>
			)}

		/>
	);
};
