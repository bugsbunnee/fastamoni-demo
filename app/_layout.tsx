import { Provider } from 'react-redux';

import { SplashScreen } from 'expo-router';
import { useColorScheme } from 'react-native';

import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';

import RootLayoutNavigation from '@/navigation/RootLayoutNavigation';
import store from '@/store/configureStore';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const colorScheme = useColorScheme();

	return (
		<Provider store={store}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<RootLayoutNavigation />
			</ThemeProvider>
		</Provider>
	);
};

export default RootLayout;
