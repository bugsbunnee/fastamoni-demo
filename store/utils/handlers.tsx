import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCountries } from './actions';
import { CountryData } from '@/utils/models';

import client from '@/api/client';

const fetchAllCountries = createAsyncThunk(getAllCountries.type, () => {
	const apiUrl = process.env.EXPO_PUBLIC_COUNTRIES_URL;
	if (!apiUrl) throw new Error('Coutries URL not defined!');

	return client.get<CountryData[]>(apiUrl);
});

export { fetchAllCountries };
