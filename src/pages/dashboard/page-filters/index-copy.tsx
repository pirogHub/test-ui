import React, {useEffect} from 'react';

import {ProposalStatusIdList, ProposalTypeIdList} from '@/state/types';

import {useCustomStore} from '@/shared/providers/store-provider';

type NewFilterProps<DataKeysType extends string, AllListType extends {id: DataKeysType; name: string}> = {
	allList: AllListType[];
	alreadySelected: Partial<Record<DataKeysType, boolean>>;
	onSelect: (keysArr: DataKeysType[]) => void;
};
const NewFilter = <DataKeysType extends string, AllListType extends {id: DataKeysType; name: string}>({
	allList,
	alreadySelected,
	onSelect,
}: NewFilterProps<DataKeysType, AllListType>) => {
	// const alreadySelected: Record<string, boolean> = {};

	const onClick = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
		const target = e.target as HTMLElement;

		const itemId = target.closest('[data-item-id]')?.getAttribute('data-item-id') as DataKeysType; //(T[0]['key'];
		onSelect([itemId]);
	};

	// const allList: string[] = [];

	return (
		<ul onClick={onClick}>
			{allList.map(({id, name}) => {
				const isChecked = alreadySelected[id] ? '+' : '-';
				return (
					<li data-item-id={id} key={id}>
						{isChecked} {name}
					</li>
				);
			})}
		</ul>
	);
};

const dataStatus = [...ProposalStatusIdList].map((i) => ({id: i, name: i}));
const dataType = [...ProposalTypeIdList].map((i) => ({id: i, name: i}));

const Page = () => {
	const {tableStore} = useCustomStore();

	const {
		data: {status, type},
		setters: {status: setStatus, type: setType},
	} = tableStore;

	useEffect(() => {
		console.log('type', type);
	}, [type]);
	useEffect(() => {
		console.log('status', status);
	}, [status]);

	return (
		<div style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
			<NewFilter
				//
				allList={dataStatus}
				alreadySelected={status}
				onSelect={setStatus}
			/>
			<NewFilter allList={dataType} alreadySelected={type} onSelect={setType} />
		</div>
	);
};

export default Page;
