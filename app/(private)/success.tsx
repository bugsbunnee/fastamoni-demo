import React from 'react';
import AnimatedLottieView from 'lottie-react-native';

import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import Button from '@/components/themed/Button';
import Text from '@/components/themed/Text';

import useColor from '@/hooks/useColor';

const Success = () => {
	const { background: backgroundColor } = useColor();
	const { message } = useLocalSearchParams();

	const handleNavigateHome = () => {
		router.replace('/home');
	};

	return (
		<View style={[styles.container, { backgroundColor }]}>
			<AnimatedLottieView
				autoPlay
				loop
				source={require('@/assets/animations/successful.json')}
				style={styles.image}
			/>

			<View style={styles.textSpacing}>
				<Text style={styles.title}>Success!</Text>

				<Text style={[styles.title, styles.message]}>{message}</Text>
			</View>

			<View style={styles.buttons}>
				<Button label="Go back home" onPress={handleNavigateHome} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	buttons: { width: '80%' },
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		width: '100%',
		padding: 20,
	},
	image: {
		width: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	message: { fontSize: 17, paddingVertical: 10 },
	outlineButtonContainer: { marginTop: 20 },
	textSpacing: { marginVertical: 60 },
	title: {
		fontSize: 25,
		textAlign: 'center',
	},
});

export default Success;
