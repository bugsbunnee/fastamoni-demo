import { createAsyncThunk } from '@reduxjs/toolkit';
import { faker } from '@faker-js/faker';
import {
	editProfileAction,
	loginUserAction,
	registerUserAction,
	updatePasswordAction,
	updatePhotoAction,
} from './actions';

import { User } from '@/utils/models';
import client, { setAuthHeader } from '@/utils/api';

import _ from 'lodash';

interface LoginPayload {
	email: string;
	password: string;
}

interface LoginResponse {
	token: string;
}

const loginUser = createAsyncThunk(
	loginUserAction.type,
	async (session: LoginPayload) => {
		// Here, i mock a user response since the login only returns a token that can't be decoded.
		const result = await client.post<LoginResponse>('/api/login', session);
		setAuthHeader(result.data.token);

		return {
			id: 1,
			fullName: faker.person.fullName(),
			imageUri: faker.image.avatar(),
			email: session.email,
			phoneNumber: faker.phone.number(),
		};
	}
);

interface RegisterPayload extends Omit<User, 'imageUri' | 'id'> {}

const registerUser = createAsyncThunk(
	registerUserAction.type,
	async (user: RegisterPayload) => {
		return client.post<User>('/api/user?delay=3', user);
	}
);

interface UpdatePasswordPayload {
	userId: number;
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

const updateUserPassword = createAsyncThunk(
	updatePasswordAction.type,
	async (payload: UpdatePasswordPayload) => {
		const apiData = _.omit(payload, ['userId']);
		return client.put(`/api/users/${payload.userId}?delay=3`, apiData);
	}
);

interface UpdatePhotoPayload {
	userId: number;
	uri: string;
}

interface UpdateUserPhotoResponse extends UpdatePhotoPayload {
	updatedAt: string;
}

const updateUserPhoto = createAsyncThunk(
	updatePhotoAction.type,
	async (payload: UpdatePhotoPayload) => {
		const apiData = _.omit(payload, ['userId']);
		return client.patch<UpdateUserPhotoResponse>(
			`/api/users/${payload.userId}?delay=3`,
			apiData
		);
	}
);

interface EditProfilePayload {
	userId: number;
	fullName: string;
	phoneNumber: string;
	email: string;
}

const editUserProfile = createAsyncThunk(
	editProfileAction.type,
	async (payload: EditProfilePayload) => {
		const apiData = _.omit(payload, ['userId']);
		return client.put<User>(`/api/users/${payload.userId}?delay=3`, apiData);
	}
);

export {
	editUserProfile,
	loginUser,
	registerUser,
	updateUserPassword,
	updateUserPhoto,
};
