import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { AppDispatch, RootState } from '../configureStore';

import { User } from '../../utils/models';
import { loginUser } from './handlers';

import storage from '../../utils/storage';

interface AuthState {
	isAuthenticating: boolean;
	user: User | null;
}

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
		builder.addCase(loginUser.fulfilled, (auth, action) => {
			auth.isAuthenticating = false;
		});
		builder.addCase(loginUser.rejected, (auth, action) => {
			auth.isAuthenticating = false;
		});
		builder.addCase(loginUser.pending, (auth, action) => {
			auth.isAuthenticating = true;
		});
	},
});

export const { setUser } = authSlice.actions;

export const getAuth = (state: RootState) => {
	return state.auth;
};

export const retrieveUser = () => async (dispatch: AppDispatch) => {
	const user = (await storage.getUser()) as User;
	if (user) dispatch(setUser(user));
};

export const login = (token: string) => (dispatch: AppDispatch) => {
	storage.storeToken(token);

	console.log(jwtDecode(token));
	dispatch(setUser(jwtDecode(token)));
};

export const logout = () => (dispatch: AppDispatch) => {
	storage.removeToken();
	dispatch(setUser(null));
};

export const registerUser =
	(token: string) => async (dispatch: AppDispatch) => {
		storage.storeToken(token);
		dispatch(setUser(jwtDecode(token)));
	};

export default authSlice.reducer;
