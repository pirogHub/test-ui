import {MyIconName} from '@/shared/icons/icons-data';

import {StatusBadge, StatusTypes, StatusTypesVals} from '../../status-badge/badge-status';
import {FilterItem} from './filter-item';

const statuses: {key: string; data: StatusTypes}[] = [...StatusTypesVals].map((item) => ({
	key: item,
	data: item,
}));
const appTypes = [
	{key: 'inner', label: 'Внутренняя'},
	{key: 'outer', label: 'Заказная'},
];

const executors = [
	{key: 1, name: 'Иван Иванов'},
	{key: 2, name: 'Пётр Петров'},
	{key: 3, name: 'Сергей Сергеев'},
	{key: 4, name: 'Алексей Алексеев'},
	{key: 5, name: 'Дмитрий Дмитриев'},
	{key: 6, name: 'Николай Николаев'},
	{key: 7, name: 'Михаил Михайлов'},
	{key: 8, name: 'Андрей Андреев'},
	{key: 9, name: 'Владимир Владимиров'},
	{key: 10, name: 'Александр Александров'},
	{key: 11, name: 'Юрий Юрьев'},
	{key: 12, name: 'Олег Олегов'},
	{key: 13, name: 'Максим Максимов'},
	{key: 14, name: 'Евгений Евгеньев'},
	{key: 15, name: 'Игорь Игорев'},
	{key: 16, name: 'Роман Романов'},
];

type FilterFunctionType = Exclude<
	React.ComponentProps<typeof FilterItem<(typeof executors)[0]>>['filterFunction'],
	undefined
>;

const executorFilterFunction: FilterFunctionType = (searchTerm, dataItem) =>
	dataItem.name.toLowerCase().includes(searchTerm.toLowerCase());

export const FiltersDataToShow = {
	status: {
		key: 'status',
		label: 'Статус',
		data: statuses,
		filterIconComponentName: 'quill' as MyIconName,
		renderItem: (item: (typeof statuses)[0]) => <StatusBadge status={item.data} />,
		filterFunction: undefined,
		withoutCheckbox: true,
		withoutCheckAll: true,
	},
	type: {
		key: 'type',
		label: 'Тип',
		data: appTypes,
		filterIconComponentName: 'sliders' as MyIconName,
		renderItem: (item: (typeof appTypes)[0]) => <span>{item.label}</span>,
		filterFunction: undefined,
		withoutCheckbox: true,
		withoutCheckAll: true,
	},
	executor: {
		key: 'executor',
		label: 'Исполнитель',
		data: executors,
		filterIconComponentName: 'user02' as MyIconName,
		renderItem: (item: (typeof executors)[0]) => <span>{item.name}</span>,
		filterFunction: executorFilterFunction,
		withoutCheckbox: true,
		withoutCheckAll: false,
	},
};
