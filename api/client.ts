import axios from 'axios';

const client = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	timeout: 20000,
});

export default client;
