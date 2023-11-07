import axios from 'axios';

const client = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	timeout: 20000,
});

const setAuthHeader = (token: string) => {
	client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export { setAuthHeader };
export default client;
