import React from 'react';
import { Stack } from 'expo-router';

import Text from '@/components/themed/Text';

import useColor from '@/hooks/useColor';

const AuthLayout: React.FC = () => {
	const color = useColor();

	const visibleHeaderOptions = {
		headerTintColor: color.text,
		headerBackTitleVisible: false,
		headerTitle: (props: { children: string }) => (
			<Text style={{ textTransform: 'capitalize' }}>{props.children}</Text>
		),
	};

	return (
		<Stack>
			<Stack.Screen name="theme" options={{ headerShown: false }} />
			<Stack.Screen name="welcome" options={{ headerShown: false }} />
			<Stack.Screen name="login" options={visibleHeaderOptions} />
			<Stack.Screen name="register" options={visibleHeaderOptions} />
		</Stack>
	);
};

export default AuthLayout;
