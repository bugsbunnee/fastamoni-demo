import { createAction } from '@reduxjs/toolkit';

const loginUserAction = createAction('auth/loginUser');
const registerUserAction = createAction('auth/registerUser');
const updatePasswordAction = createAction('auth/updatePassword');
const updatePhotoAction = createAction('auth/updatePhoto');
const editProfileAction = createAction('auth/editProfile');

export {
	editProfileAction,
	loginUserAction,
	registerUserAction,
	updatePasswordAction,
	updatePhotoAction,
};
