import React, { useRef } from 'react';
import Constants from 'expo-constants';

import * as yup from 'yup';

import { Link, router } from 'expo-router';
import { Alert, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ActivityIndicator from '@/components/themed/ActivityIndicator';
import Form from '@/components/forms/Form';
import FormField from '@/components/forms/FormField';
import SubmitButton from '@/components/forms/SubmitButton';
import Screen from '@/components/themed/Screen';
import Text from '@/components/themed/Text';

import { getAuth, login } from '@/store/auth';
import { loginUser } from '@/store/auth/handlers';
import { useAppDispatch, useAppSelector } from '@/store/configureStore';

import useColor from '@/hooks/useColor';

interface LoginFormValues {
	email: string;
	password: string;
}

const validationSchema = yup.object().shape({
	email: yup.string().email().required().label('Email Address'),
	password: yup.string().required().label('Password'),
});

const LoginScreen: React.FC = () => {
	const dispatch = useAppDispatch();
	const auth = useAppSelector(getAuth);
	const color = useColor();

	const handleSubmit = async (values: LoginFormValues) => {
		try {
			const result = await dispatch(loginUser(values)).unwrap();
			dispatch(login(result.data));

			router.replace('/home');
		} catch (error) {
			Alert.alert('Error', 'Invalid email or password.');
		}
	};

	return (
		<>
			<ActivityIndicator isVisible={auth.isAuthenticating} />

			<Screen style={[styles.container, { backgroundColor: color.background }]}>
				<Form
					initialValues={{ email: '', password: '' }}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					<KeyboardAwareScrollView
						enableOnAndroid
						contentContainerStyle={styles.flex}
					>
						<View style={styles.flex}>
							<FormField
								autoCapitalize="none"
								name="email"
								placeholder="Email Address"
							/>

							<FormField
								autoCapitalize="none"
								name="password"
								placeholder="Password"
								secureTextEntry
							/>
						</View>

						<SubmitButton label="Continue" />
					</KeyboardAwareScrollView>

					<Link href="/register">
						<View style={styles.registerContainer}>
							<Text style={styles.registerBlack}>
								Don't have an account?{' '}
								<Text
									style={[styles.registerPrimary, { color: color.primary }]}
								>
									Register
								</Text>
							</Text>
						</View>
					</Link>
				</Form>
			</Screen>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingBottom: Constants.statusBarHeight,
	},
	flex: { flex: 1 },
	registerBlack: {
		fontSize: 15,
		textAlign: 'center',
	},
	registerContainer: { padding: 20 },
	registerPrimary: {
		fontSize: 15,
		textAlign: 'center',
	},
});

export default LoginScreen;
