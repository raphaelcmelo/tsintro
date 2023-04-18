import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { CityService } from '../../../shared/services/api/city/CityService';
import { useDebounce } from '../../../shared/hooks';
import { useField } from '@unform/core';
import { getConstantValue } from 'typescript';

type TAutoCompleteOption = {
	id: number;
	label: string;
}

interface IAutocompleteCityProps {
  isExternalLoading?: boolean
}

export const AutoCompleteCity: React.FC<IAutocompleteCityProps> = ({ isExternalLoading = false}) => {
	const { fieldName, defaultValue, registerField,error,clearError} = useField('cityId');
	const { debounce } = useDebounce();
	const [options, setOptions] = useState<TAutoCompleteOption[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [find, setFind] = useState('');
	const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

	useEffect(() => {
		registerField({
			name: fieldName,
			getValue:  () => selectedId,
			setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
		});
	}, [registerField, fieldName, selectedId, ]);

	useEffect(() => {
		setIsLoading(true);

		debounce(() => {
			CityService.getAll(1, find)
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

	const autoCompleteSelectedOption = useMemo(() => {
		if (!selectedId) return null;

		const selectedOption = options.find(option => option.id === selectedId);
		if(!selectedId) return null;
		return selectedOption;
	}, [selectedId, options]);

	return(
		<Autocomplete
			openText='Abrir'
			closeText='Fechar'
			noOptionsText='Sem opções'
			loadingText='Carregando...'

			disablePortal

			value={autoCompleteSelectedOption}
			disabled={isExternalLoading}
			loading={isLoading}
			popupIcon={ (isExternalLoading || isLoading) ? <CircularProgress size={28}/> : undefined }
			onInputChange={(_, newValue) => setFind(newValue)}
			onChange={(_, newValue) => {setSelectedId(newValue?.id); setFind('');}}
			options={options}
			renderInput={(params) => (
				<TextField
					{...params}
					label='Cidade'
				/>
			)}

		/>
	);
};
