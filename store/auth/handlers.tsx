import _ from 'lodash';

import { createAsyncThunk } from '@reduxjs/toolkit';

import {
	randAvatar,
	randFullName,
	randPhoneNumber,
	randNumber,
} from '@ngneat/falso';

import { COUNTRY_CODE, COUNTRY_PHONE_PREFIX } from '@/utils/constants';

import {
	editProfileAction,
	loginUserAction,
	registerUserAction,
	updatePasswordAction,
	updatePhotoAction,
} from '@/store/auth/actions';

import { User } from '@/utils/models';
import client, { setAuthHeader } from '@/utils/api';

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
			id: randNumber(),
			fullName: randFullName(),
			imageUri: randAvatar(),
			email: session.email,
			phoneNumber: randPhoneNumber({ countryCode: COUNTRY_CODE }).split(
				COUNTRY_PHONE_PREFIX
			)[1],
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
