import { Environment } from '../../../../environment';
import { Api } from '../axios-config';

export interface IListPeople {
  id: number;
  email: string;
  cityId: number;
  fullName: string;
}

interface IDetailPeople {
  id: number;
  email: string;
  cityId: number;
  fullName: string;
}

type TPeopleWithTotalCount = {
  data: IListPeople[];
  totalCount: number
}

const getAll = async (page = 1, filter = ''): Promise<TPeopleWithTotalCount | Error> => {
	try {
		const urlRelative = `/people?_page=${page}&_limit=${Environment.LINES_LIMIT}&fullName_like=${filter}`;
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

const getById = async (id: number): Promise<IDetailPeople | Error> => {
	try {
		const { data } = await Api.get(`/people/${id}`);

		if (data) {
			return data;
		}
		return new Error('Erro ao consultar o registro.');
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || 'Erro ao listar o registro.');
	}
};
const create = async (userData: Omit<IDetailPeople, 'id'>): Promise<number | Error> => {
	try {
		const { data } = await Api.post<IDetailPeople>('/people', userData);

		if (data) {
			return data.id;
		}
		return new Error('Erro ao criar o registro.');
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || 'Erro ao criar o registro.');
	}
};

const update = async (id: number, userData: Omit<IDetailPeople, 'id'>): Promise<void | Error> => {
	try {
		await Api.put(`/people/${id}`, userData);
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || 'Erro ao atualizar o registro.');
	}
};

const deleteById = async (id: number): Promise<void | Error> => {
	try {
		await Api.delete(`/people/${id}`);
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || 'Erro ao excluir o registro.');
	}
};


export const PeopleService = {
	getAll,
	getById,
	create,
	update,
	deleteById,
};
