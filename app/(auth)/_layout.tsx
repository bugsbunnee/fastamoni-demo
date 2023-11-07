import { Stack } from 'expo-router';
import Text from '@/components/themed/Text';

import useColor from '@/hooks/useColor';

const AuthLayout = () => {
	const color = useColor();

	return (
		<Stack>
			<Stack.Screen name="welcome" options={{ headerShown: false }} />
			<Stack.Screen name="theme" options={{ headerShown: false }} />
			<Stack.Screen
				name="login"
				options={{
					headerTitle: () => <Text>Login</Text>,
					headerTintColor: color.text,
				}}
			/>
			<Stack.Screen
				name="register"
				options={{
					headerTitle: () => <Text>Register</Text>,
					headerTintColor: color.text,
				}}
			/>
		</Stack>
	);
};

export default AuthLayout;
