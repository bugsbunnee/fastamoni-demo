import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../configureStore';
import { fetchAllCountries } from './handlers';

import { CountryData } from '@/utils/models';

interface UtilsState {
	isAppReady: boolean;
	isLoading: boolean;
	defaultCountry: CountryData | null;
	countries: {
		list: CountryData[];
	};
}

const initialState: UtilsState = {
	isAppReady: false,
	isLoading: false,
	defaultCountry: null,
	countries: {
		list: [],
	},
};

const utilsSlice = createSlice({
	name: 'utils',
	initialState,
	reducers: {
		setAppReady: (utils, action: PayloadAction<boolean>) => {
			utils.isAppReady = action.payload;
		},
		setDefaultCountry: (utils, action: PayloadAction<CountryData>) => {
			utils.defaultCountry = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllCountries.pending, (utils) => {
			utils.isLoading = true;
		});
		builder.addCase(fetchAllCountries.fulfilled, (utils, action) => {
			utils.isLoading = false;
			utils.countries.list = action.payload.data;
		});
		builder.addCase(fetchAllCountries.rejected, (utils) => {
			utils.isLoading = false;
		});
	},
});

export const { setAppReady, setDefaultCountry } = utilsSlice.actions;

export const getUtils = (state: RootState) => {
	return state.utils;
};

export default utilsSlice.reducer;
