import {z} from 'zod';

export type User = {
	id: number;
	email: string;
	name: string;
	role: 'default' | 'analyst';
	avatar: string;
};

export const ProposalTypeIdList = ['inner', 'outer'] as const;
export const ProposalTypeIdSchema = z.enum(ProposalTypeIdList);
export type ProposalTypeIdType = (typeof ProposalTypeIdList)[number];

export const ProposalStatusIdList = ['analyze', 'in-work', 'done', 'specified', 'rejected', 'waited', 'draft'] as const;
export const ProposalStatusIdSchema = z.enum(ProposalStatusIdList);
export type ProposalStatusIdType = z.infer<typeof ProposalStatusIdSchema>;

export type ProposalSetFilterActionType<T> = [{id: T; val?: boolean}[], stateForAll?: boolean];

export type ProposalFilterRecordType<T extends string> = Partial<Record<T, boolean>>;

//
export type ProposalExecutorIdType = string; //| string;
export const ProposalExecutorSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
});
export type ProposalExecutorType = z.infer<typeof ProposalExecutorSchema>;

export type ProposalSortingItem = [string, 'asc' | 'desc' | undefined];

export type FiltersNamesType = keyof TableFiltersState['filters'];

export type ProposalQueryObjectType = Record<
	string,
	| Exclude<ProposalSortingItem, undefined>[]
	//
	| Partial<ProposalFilterRecordType<FiltersNamesType>>
>;

export type TableFiltersState = {
	filters: {
		type: ProposalFilterRecordType<ProposalTypeIdType>;
		status: ProposalFilterRecordType<ProposalStatusIdType>;
		executor: ProposalFilterRecordType<ProposalExecutorIdType>;
	};
	sorting?: ProposalSortingItem[]; // TODO

	//
	queryObject: ProposalQueryObjectType;
	prevQueryObjectString: string;
	showedFiltersOrder: FiltersNamesType[];
	// fetchedRowsByFilters: unknown[]; // TODO
	fetchRowState: {
		fetchedRowsIsLoading: boolean;
		fetchedRowsByFilters: unknown[]; // TODO
		fetchedRowsError: string | null; // TODO
	};
};
