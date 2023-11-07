import { useEffect } from 'react';
import { Slot, SplashScreen, router } from 'expo-router';
import { loadAsync } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

import {
	ThemeProvider,
	DarkTheme,
	DefaultTheme,
} from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@/store/configureStore';
import { getAuth, retrieveUser } from '@/store/auth';
import { getUtils, setAppReady, setTheme } from '@/store/utils';

import ActivityIndicator from '@/components/themed/ActivityIndicator';

const RootLayoutNavigation = () => {
	const auth = useAppSelector(getAuth);
	const utils = useAppSelector(getUtils);

	const dispatch = useAppDispatch();
	const colorScheme = useColorScheme();

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

			const nextRoute = auth.user ? '/home' : '/theme';
			router.replace(nextRoute);
		}
	};

	useEffect(() => {
		dispatch(setTheme(colorScheme));
	}, [colorScheme]);

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
			<ThemeProvider value={utils.theme === 'dark' ? DarkTheme : DefaultTheme}>
				<Slot />
				<StatusBar style="auto" />
			</ThemeProvider>
		</SafeAreaProvider>
	);
};

export default RootLayoutNavigation;
