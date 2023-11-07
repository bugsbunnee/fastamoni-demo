import React, { useEffect, useRef } from 'react';
import Constants from 'expo-constants';

import * as yup from 'yup';
import 'yup-phone-lite';

import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ActivityIndicator from '@/components/themed/ActivityIndicator';
import Form from '@/components/forms/Form';
import FormField from '@/components/forms/FormField';
import SubmitButton from '@/components/forms/SubmitButton';
import Screen from '@/components/themed/Screen';

import { fetchAllCountries } from '@/store/utils/handlers';
import { getAuth, login, registerUser } from '@/store/auth';
import { loginUser } from '@/store/auth/handlers';
import { getUtils, setDefaultCountry } from '@/store/utils';
import { useAppDispatch, useAppSelector } from '@/store/configureStore';

import useColor from '@/hooks/useColor';

interface RegisterFormValues {
	email: string;
	phoneNumber: string;
	password: string;
	confirmPassword: string;
}

const validationSchema = yup.object().shape({
	email: yup.string().email().required().label('Email Address'),
	phoneNumber: yup.string().phone('NG').required().label('Phone Number'),
	password: yup.string().required().label('Password'),
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
		try {
			const result = await dispatch(loginUser(values)).unwrap();
			registerUser(result.data.token);

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
						email: '',
						password: '',
						confirmPassword: '',
						phoneNumber: '',
					}}
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

						<SubmitButton label="Continue" />
					</KeyboardAwareScrollView>
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
});

export default RegisterScreen;
