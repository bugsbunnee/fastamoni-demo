import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/store/configureStore';

import { AuthState, User } from '@/utils/models';
import {
	editUserProfile,
	loginUser,
	registerUser,
	updateUserPassword,
	updateUserPhoto,
} from './handlers';

import storage from '@/utils/storage';

const initialState: AuthState = {
	isAuthenticating: false,
	user: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (auth, action: PayloadAction<User | null>) => {
			auth.user = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loginUser.fulfilled, (auth) => {
			auth.isAuthenticating = false;
		});
		builder.addCase(loginUser.rejected, (auth) => {
			auth.isAuthenticating = false;
		});
		builder.addCase(loginUser.pending, (auth) => {
			auth.isAuthenticating = true;
		});
		builder.addCase(registerUser.fulfilled, (auth) => {
			auth.isAuthenticating = false;
		});
		builder.addCase(registerUser.rejected, (auth) => {
			auth.isAuthenticating = false;
		});
		builder.addCase(registerUser.pending, (auth) => {
			auth.isAuthenticating = true;
		});
		builder.addCase(updateUserPassword.fulfilled, (auth) => {
			auth.isAuthenticating = false;
		});
		builder.addCase(updateUserPassword.rejected, (auth) => {
			auth.isAuthenticating = false;
		});
		builder.addCase(updateUserPassword.pending, (auth) => {
			auth.isAuthenticating = true;
		});
		builder.addCase(updateUserPhoto.fulfilled, (auth) => {
			auth.isAuthenticating = false;
		});
		builder.addCase(updateUserPhoto.rejected, (auth) => {
			auth.isAuthenticating = false;
		});
		builder.addCase(updateUserPhoto.pending, (auth) => {
			auth.isAuthenticating = true;
		});
		builder.addCase(editUserProfile.fulfilled, (auth) => {
			auth.isAuthenticating = false;
		});
		builder.addCase(editUserProfile.rejected, (auth) => {
			auth.isAuthenticating = false;
		});
		builder.addCase(editUserProfile.pending, (auth) => {
			auth.isAuthenticating = true;
		});
	},
});

export const { setUser } = authSlice.actions;

export const getAuth = (state: RootState) => {
	return state.auth;
};

export const retrieveUser = () => async (dispatch: AppDispatch) => {
	const user = await storage.getUser();
	if (user) dispatch(setUser(user));
};

export const login = (user: User) => (dispatch: AppDispatch) => {
	storage.storeUser(user);
	dispatch(setUser(user));
};

export const logout = () => (dispatch: AppDispatch) => {
	storage.removeUser();
	dispatch(setUser(null));
};

export default authSlice.reducer;
