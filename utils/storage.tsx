import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';

const key = 'fastmoni_user';

const storeToken = async (token: string) => {
	try {
		await SecureStore.setItemAsync(key, token);
	} catch (error) {
		console.log('Error storing the user', error);
	}
};

const getToken = async (): Promise<string | null> => {
	try {
		return await SecureStore.getItemAsync(key);
	} catch (error) {
		console.log('Error retrieving the user details', error);
		return null;
	}
};

const getUser = async () => {
	const token = await getToken();
	return token ? jwtDecode(token) : null;
};

const removeToken = async () => {
	try {
		await SecureStore.deleteItemAsync(key);
	} catch (error) {
		console.log('Error removing the user', error);
	}
};

export default { getUser, storeToken, removeToken };
