import React, { useEffect } from 'react';
import _ from 'lodash';

import YupPassword from 'yup-password';

import * as yup from 'yup';
import 'yup-phone-lite';

import { Link, router } from 'expo-router';
import { Keyboard, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ActivityIndicator from '@/components/themed/ActivityIndicator';
import Form from '@/components/forms/Form';
import FormField from '@/components/forms/FormField';
import SubmitButton from '@/components/forms/SubmitButton';
import Screen from '@/components/themed/Screen';
import Text from '@/components/themed/Text';

import { fetchAllCountries } from '@/store/utils/handlers';
import { getAuth, login } from '@/store/auth';
import { registerUser } from '@/store/auth/handlers';
import { getUtils, setDefaultCountry } from '@/store/utils';
import { useAppDispatch, useAppSelector } from '@/store/configureStore';

import useColor from '@/hooks/useColor';

YupPassword(yup);

interface RegisterFormValues {
	fullName: string;
	email: string;
	phoneNumber: string;
	password: string;
	confirmPassword: string;
}

const validationSchema = yup.object().shape({
	fullName: yup.string().required().label('Full Name'),
	email: yup.string().email().required().label('Email Address'),
	phoneNumber: yup.string().phone('NG').required().label('Phone Number'),
	password: yup
		.string()
		.minLowercase(1)
		.minNumbers(1)
		.minUppercase(1)
		.minSymbols(1, 'New Password should contain at least one special character')
		.min(8)
		.required()
		.label('Password'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must match')
		.required()
		.label('Confirm New Password'),
});

const RegisterScreen: React.FC = () => {
	const dispatch = useAppDispatch();
	const color = useColor();

	const auth = useAppSelector(getAuth);
	const utils = useAppSelector(getUtils);

	const handleSubmit = async (values: RegisterFormValues) => {
		Keyboard.dismiss();

		const apiData = _.omit(values, ['confirmPassword']);

		try {
			const result = await dispatch(registerUser(apiData)).unwrap();
			dispatch(login(result.data));

			router.replace('/home');
		} catch (error) {
			alert((error as Error).message);
		}
	};

	useEffect(() => {
		dispatch(fetchAllCountries());
	}, []);

	useEffect(() => {
		if (utils.countries.list.length > 0) {
			const defaultCountry = utils.countries.list.find((country) => {
				return country.cca2 === process.env.EXPO_PUBLIC_COUNTRY_CODE;
			});

			if (defaultCountry) {
				dispatch(setDefaultCountry(defaultCountry));
			}
		}
	}, [utils.countries.list]);

	return (
		<>
			<ActivityIndicator isVisible={auth.isAuthenticating} />

			<Screen style={[styles.container, { backgroundColor: color.background }]}>
				<Form
					initialValues={{
						fullName: '',
						email: '',
						password: '',
						confirmPassword: '',
						phoneNumber: '',
					}}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					<KeyboardAwareScrollView enableOnAndroid>
						<View style={styles.flex}>
							<FormField
								autoCapitalize="none"
								name="fullName"
								placeholder="Full Name"
								keyboardType="name-phone-pad"
							/>

							<FormField
								autoCapitalize="none"
								name="email"
								placeholder="Email Address"
								keyboardType="email-address"
							/>

							<FormField
								autoCapitalize="none"
								keyboardType="phone-pad"
								name="phoneNumber"
								placeholder="Phone Number"
								phoneData={utils.defaultCountry ?? undefined}
							/>

							<FormField
								autoCapitalize="none"
								name="password"
								placeholder="Password"
								secureTextEntry
							/>

							<FormField
								autoCapitalize="none"
								name="confirmPassword"
								placeholder="Confirm Password"
								secureTextEntry
							/>
						</View>
					</KeyboardAwareScrollView>

					<SubmitButton label="Continue" />
					<Link href="/(auth)/login">
						<View style={styles.loginContainer}>
							<Text style={styles.loginBlack}>
								Already have an account?{' '}
								<Text style={[styles.loginPrimary, { color: color.primary }]}>
									Login
								</Text>{' '}
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
		padding: 10,
	},
	flex: { flex: 1 },
	loginBlack: {
		fontSize: 15,
		textAlign: 'center',
	},
	loginContainer: { padding: 20 },
	loginPrimary: {
		fontSize: 15,
		textAlign: 'center',
	},
});

export default RegisterScreen;
