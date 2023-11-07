import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { Slot, SplashScreen, router } from 'expo-router';
import { loadAsync } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

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
			Appearance.setColorScheme('light');

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

			const nextRoute = auth.user ? '/home' : '/theme';
			router.replace(nextRoute);
		}
	};

	useEffect(() => {
		handleLoadAssets();
	}, []);

	useEffect(() => {
		handleHideSplashScreen();
	}, [utils.isAppReady]);

	if (!utils.isAppReady) {
		return <ActivityIndicator isVisible />;
	}

	return (
		<SafeAreaProvider>
			<Slot />
			<StatusBar style="auto" />
		</SafeAreaProvider>
	);
};

export default RootLayoutNavigation;
