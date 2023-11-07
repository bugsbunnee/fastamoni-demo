import { Stack } from 'expo-router';

const PublicLayout = () => {
	return (
		<Stack>
			<Stack.Screen name="home" options={{ headerShown: false }} />
		</Stack>
	);
};

export default PublicLayout;
