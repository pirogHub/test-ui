import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type ProposalType = {
	id: number;
	type: string;
	status: string;
	createdAt: number;
	executor: string;
};

const initialState: ProposalType = {
	id: 0,
	type: '',
	status: '',
	createdAt: 0,
	executor: '',
};

const proposalSlice = createSlice({
	name: 'proposal',
	initialState,
	reducers: {
		setExecutor: (state, action: PayloadAction<ProposalType['executor']>) => {
			state.executor = action.payload;
		},
		setType: (state, action: PayloadAction<ProposalType['type']>) => {
			state.type = action.payload;
		},
		setStatus: (state, action: PayloadAction<ProposalType['status']>) => {
			state.status = action.payload;
		},
		setCreatedAt: (state, action: PayloadAction<ProposalType['createdAt']>) => {
			state.createdAt = action.payload;
		},
		setId: (state, action: PayloadAction<ProposalType['id']>) => {
			state.id = action.payload;
		},
	},
});

export const {setExecutor, setType, setStatus, setCreatedAt, setId} = proposalSlice.actions;

export const proposalReducer = proposalSlice.reducer;
