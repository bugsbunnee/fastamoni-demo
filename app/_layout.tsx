import { Provider } from 'react-redux';

import { SplashScreen } from 'expo-router';

import RootLayoutNavigation from '@/navigation/RootLayoutNavigation';
import store from '@/store/configureStore';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	return (
		<Provider store={store}>
			<RootLayoutNavigation />
		</Provider>
	);
};

export default RootLayout;
