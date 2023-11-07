import { Stack } from 'expo-router';

const PrivateLayout = () => {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="edit-profile" />
			<Stack.Screen name="home" />
			<Stack.Screen name="logout" />
			<Stack.Screen name="password-update" />
			<Stack.Screen name="success" />
			<Stack.Screen name="theme-update" />
			<Stack.Screen name="update-photo" />
		</Stack>
	);
};

export default PrivateLayout;
