import React from 'react';
import { router, useFocusEffect } from 'expo-router';

import ActivityIndicator from '@/components/themed/ActivityIndicator';

import { logout } from '@/store/auth';
import { useAppDispatch } from '@/store/configureStore';

const Logout: React.FC = () => {
	const dispatch = useAppDispatch();

	useFocusEffect(() => {
		dispatch(logout());

		router.replace('/theme');
	});

	return <ActivityIndicator isVisible />;
};

export default Logout;
