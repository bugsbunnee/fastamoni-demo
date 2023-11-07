import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCountries } from './actions';

import client from '@/api/client';
import { CountryData } from '@/utils/models';

interface CountryResponse {
	data: CountryData[];
}

const fetchAllCountries = createAsyncThunk(getAllCountries.type, () => {
	const apiUrl = process.env.EXPO_PUBLIC_COUNTRIES_URL;
	if (!apiUrl) throw new Error('Coutries URL not defined!');

	return client.get<CountryResponse>(apiUrl);
});

export { fetchAllCountries };
