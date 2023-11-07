import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColorSchemeName } from 'react-native';

import { AppDispatch, RootState } from '../configureStore';
import { fetchAllCountries } from './handlers';

import { CountryData } from '@/utils/models';
import { COUNTRY_CODE } from '@/utils/constants';

interface UtilsState {
	theme: ColorSchemeName;
	isAppReady: boolean;
	isLoading: boolean;
	defaultCountry: CountryData | null;
	countries: {
		list: CountryData[];
	};
}

const initialState: UtilsState = {
	theme: null,
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
		setTheme: (utils, action) => {
			utils.theme = action.payload;
		},
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

export const { setAppReady, setDefaultCountry, setTheme } = utilsSlice.actions;

export const getUtils = (state: RootState) => {
	return state.utils;
};

export const initializeDefaultCountry =
	() => async (dispatch: AppDispatch, getState: () => RootState) => {
		const { utils } = getState();

		const defaultCountry = utils.countries.list.find((country) => {
			return country.cca2 === COUNTRY_CODE;
		});

		if (defaultCountry) {
			dispatch(setDefaultCountry(defaultCountry));
		}
	};

export default utilsSlice.reducer;
