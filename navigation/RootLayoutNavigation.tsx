import { Slot, SplashScreen, router } from 'expo-router';
import { useEffect } from 'react';
import { loadAsync } from 'expo-font';

import { useAppDispatch, useAppSelector } from '@/store/configureStore';
import { getAuth, retrieveUser } from '@/store/auth';
import { getUtils, setAppReady } from '@/store/utils';

import ActivityIndicator from '@/components/themed/ActivityIndicator';

const RootLayoutNavigation = () => {
	const auth = useAppSelector(getAuth);
	const utils = useAppSelector(getUtils);

	const dispatch = useAppDispatch();

	const handleLoadAssets = async () => {
		try {
			dispatch(retrieveUser());
			await loadAsync({
				SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
			});
		} catch (error) {
			console.warn;
		} finally {
			dispatch(setAppReady(true));
		}
	};

	const handleHideSplashScreen = async () => {
		if (utils.isAppReady) {
			await SplashScreen.hideAsync();

			console.log(auth.user);
			const nextRoute = auth.user ? '/home' : '/theme';
			router.push(nextRoute);
		}
	};

	useEffect(() => {
		handleLoadAssets();
	}, []);

	useEffect(() => {
		handleHideSplashScreen();
	}, [utils.isAppReady, auth.user]);

	if (!utils.isAppReady) {
		return <ActivityIndicator isVisible />;
	}

	return <Slot />;
};

export default RootLayoutNavigation;
