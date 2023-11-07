import * as SecureStore from 'expo-secure-store';
import { User } from './models';

const key = 'fastamoni_user';

const storeUser = async (user: User) => {
	try {
		await SecureStore.setItemAsync(key, JSON.stringify(user));
	} catch (error) {
		console.log('Error storing the user', error);
	}
};

const getUser = async (): Promise<User | null> => {
	try {
		const user = await SecureStore.getItemAsync(key);
		return user ? JSON.parse(user) : null;
	} catch (error) {
		console.log('Error retrieving the user details', error);

		return null;
	}
};

const removeUser = async () => {
	try {
		await SecureStore.deleteItemAsync(key);
	} catch (error) {
		console.log('Error removing the user', error);
	}
};

export default { getUser, storeUser, removeUser };
