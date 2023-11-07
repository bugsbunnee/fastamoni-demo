import React from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import Button from '@/components/themed/Button';
import Screen from '@/components/themed/Screen';
import Text from '@/components/themed/Text';
import ThemeToggle from '@/components/themed/ThemeToggle';

import colors from '@/constants/Colors';

const LoginScreen = () => {
	return (
		<React.Fragment>
			<Screen style={styles.container}>
				<ThemeToggle />

				<View style={styles.innerContainer}>
					<Text style={styles.header}>Set up your profile</Text>

					<Button label="Login" onPress={() => router.push('/login')} />

					<View style={styles.divider}>
						<View style={styles.horizontalRule} />

						<Text style={styles.horizontalText}>OR</Text>

						<View style={styles.horizontalRule} />
					</View>

					<Button
						label="Create a new account"
						onPress={() => router.push('/register')}
					/>
				</View>
			</Screen>
		</React.Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	divider: {
		margin: 20,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	googleButtonContainer: {
		marginBottom: 20,
	},
	innerContainer: {
		width: '100%',
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		fontSize: 18,
		paddingBottom: 20,
	},
	horizontalRule: { flex: 1, height: 1, backgroundColor: colors.light.gray },
	horizontalText: {
		width: 50,
		fontSize: 12,
		textAlign: 'center',
	},
});

export default LoginScreen;
