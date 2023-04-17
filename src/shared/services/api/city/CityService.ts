import { Environment } from '../../../../environment';
import { Api } from '../axios-config';

export interface IListCity {
  id: number;
  name: string;
}

interface IDetailCity {
  id: number;
  name: string;
}

type TCityWithTotalCount = {
  data: IListCity[];
  totalCount: number
}

const getAll = async (page = 1, filter = ''): Promise<TCityWithTotalCount | Error> => {
	try {
		const urlRelative = `/city?_page=${page}&_limit=${Environment.LINES_LIMIT}&name_like=${filter}`;
		const { data, headers } = await Api.get(urlRelative);

		if (data) {
			return {
				data,
				totalCount: Number(headers['x-total-count']),
			};
		}
		return new Error('Erro ao consultar os registros.');
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || 'Erro ao listar os registros.');
	}
};

const getById = async (id: number): Promise<IDetailCity | Error> => {
	try {
		const { data } = await Api.get(`/city/${id}`);

		if (data) {
			return data;
		}
		return new Error('Erro ao consultar o registro.');
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || 'Erro ao listar o registro.');
	}
};
const create = async (userData: Omit<IDetailCity, 'id'>): Promise<number | Error> => {
	try {
		const { data } = await Api.post<IDetailCity>('/city', userData);

		if (data) {
			return data.id;
		}
		return new Error('Erro ao criar o registro.');
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
	}
};

const update = async (id: number, userData: IDetailCity): Promise<void | Error> => {
	try {
		await Api.put(`/city/${id}`, userData);
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
	}
};

const deleteById = async (id: number): Promise<void | Error> => {
	try {
		await Api.delete(`/city/${id}`);
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || 'Erro ao excluir o registro.');
	}
};


export const CityService = {
	getAll,
	getById,
	create,
	update,
	deleteById,
};
