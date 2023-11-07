import { createAction } from '@reduxjs/toolkit';

const getAllCountries = createAction('countries/getAll');

export { getAllCountries };
