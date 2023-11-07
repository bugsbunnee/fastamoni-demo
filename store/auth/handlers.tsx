import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserAction, registerUserAction } from './actions';

import client from '../../api/client';

interface LoginPayload {
	email: string;
	password: string;
}

interface LoginUserResponse {
	token: string;
}

const loginUser = createAsyncThunk(
	loginUserAction.type,
	async (session: LoginPayload) => {
		return client.post<LoginUserResponse>('/api/login?delay=3', session);
	}
);

interface RegisterUserResponse {
	id: number;
	token: string;
}

const registerUser = createAsyncThunk(
	registerUserAction.type,
	async (session: LoginPayload) => {
		return client.post<RegisterUserResponse>('/api/create', session);
	}
);

export { loginUser, registerUser };
