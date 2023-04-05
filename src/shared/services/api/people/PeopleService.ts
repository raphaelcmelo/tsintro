import { Environment } from '../../../../environment';
import { Api } from '../axios-config';

interface IListPeople {
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
		const urlRelative = `/people?_page${page}&_limit=${Environment.LINES_LIMIT}&fullName_like=${filter}`;
		const { data, headers } = await Api.get(urlRelative);

		if (data) {
			return {
				data,
				totalCount: Number(headers['x-total-count']),
			};
		}
	} catch (error) {
		console.error(error);
		return new Error((error as { message: string }).message || 'Erro ao listar os registros');

	}
};

const getById = async (): Promise<any> => { };

const create = async (): Promise<any> => { };

const update = async (): Promise<any> => { };

const deleteById = async (): Promise<any> => { };


export const PeopleService = {
	getAll,
	getById,
	create,
	update,
	deleteById,
};
