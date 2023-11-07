import React from 'react';
import Constants from 'expo-constants';
import YupPassword from 'yup-password';
import _ from 'lodash';

import * as yup from 'yup';

import { router } from 'expo-router';
import { Keyboard, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ActivityIndicator from '@/components/themed/ActivityIndicator';
import BackButton from '@/components/themed/BackButton';
import Form from '@/components/forms/Form';
import FormField from '@/components/forms/FormField';
import SubmitButton from '@/components/forms/SubmitButton';
import Screen from '@/components/themed/Screen';

import { getAuth } from '@/store/auth';
import { updateUserPassword } from '@/store/auth/handlers';
import { useAppDispatch, useAppSelector } from '@/store/configureStore';

import useColor from '@/hooks/useColor';

YupPassword(yup);

interface PasswordFormValues {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

const validationSchema = yup.object().shape({
	currentPassword: yup.string().required().label('Current Password'),
	newPassword: yup
		.string()
		.minLowercase(1)
		.minNumbers(1)
		.minUppercase(1)
		.minSymbols(1, 'New Password should contain at least one special character')
		.min(8)
		.required()
		.label('New Password'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('newPassword')], 'Passwords must match')
		.required()
		.label('Confirm New Password'),
});

const PasswordUpdateScreen: React.FC = () => {
	const auth = useAppSelector(getAuth);
	const color = useColor();
	const dispatch = useAppDispatch();

	const handleSubmit = async (values: PasswordFormValues) => {
		Keyboard.dismiss();
		const payload = { ...values, userId: auth.user?.id as number };

		try {
			await dispatch(updateUserPassword(payload)).unwrap();

			router.push({
				pathname: '/success',
				params: { message: 'Your password was updated successfully!' },
			});
		} catch (error) {
			alert((error as Error).message);
		}
	};

	return (
		<>
			<ActivityIndicator isVisible={auth.isAuthenticating} />

			<Screen style={[styles.container, { backgroundColor: color.background }]}>
				<BackButton />

				<Form
					initialValues={{
						currentPassword: '',
						newPassword: '',
						confirmPassword: '',
					}}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					<KeyboardAwareScrollView
						enableOnAndroid
						contentContainerStyle={styles.flex}
					>
						<View style={styles.content}>
							<FormField
								autoCapitalize="none"
								name="currentPassword"
								placeholder="Current Password"
								secureTextEntry
							/>

							<FormField
								autoCapitalize="none"
								name="newPassword"
								placeholder="New Password"
								secureTextEntry
							/>

							<FormField
								autoCapitalize="none"
								name="confirmPassword"
								placeholder="Confirm Password"
								secureTextEntry
							/>
						</View>

						<SubmitButton label="Update" />
					</KeyboardAwareScrollView>
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
	content: {
		flex: 1,
		marginTop: 20,
	},
	flex: { flex: 1 },
	navigation: {
		width: 50,
		height: 50,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 40,
	},
});

export default PasswordUpdateScreen;
