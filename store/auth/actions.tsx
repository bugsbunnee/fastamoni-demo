import { createAction } from '@reduxjs/toolkit';

const loginUserAction = createAction('auth/loginUser');
const registerUserAction = createAction('auth/registerUser');

export { loginUserAction, registerUserAction };
