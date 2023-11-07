import React, { useEffect } from 'react';
import Constants from 'expo-constants';
import _ from 'lodash';

import * as yup from 'yup';
import 'yup-phone-lite';

import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ActivityIndicator from '@/components/themed/ActivityIndicator';
import BackButton from '@/components/themed/BackButton';
import Form from '@/components/forms/Form';
import FormField from '@/components/forms/FormField';
import SubmitButton from '@/components/forms/SubmitButton';
import Screen from '@/components/themed/Screen';

import { fetchAllCountries } from '@/store/utils/handlers';
import { getAuth, login } from '@/store/auth';
import { editUserProfile } from '@/store/auth/handlers';
import { getUtils, setDefaultCountry } from '@/store/utils';
import { useAppDispatch, useAppSelector } from '@/store/configureStore';

import useColor from '@/hooks/useColor';

interface EditProfileFormValues {
	fullName: string;
	email: string;
	phoneNumber: string;
}

const validationSchema = yup.object().shape({
	fullName: yup.string().required().label('Full Name'),
	email: yup.string().email().required().label('Email Address'),
	phoneNumber: yup.string().phone('NG').required().label('Phone Number'),
});

const EditProfileScreen: React.FC = () => {
	const dispatch = useAppDispatch();
	const color = useColor();

	const auth = useAppSelector(getAuth);
	const utils = useAppSelector(getUtils);

	const handleSubmit = async (values: EditProfileFormValues) => {
		const payload = { ...values, userId: auth.user?.id as number };

		try {
			const result = await dispatch(editUserProfile(payload)).unwrap();
			dispatch(login(result.data));

			router.push({
				pathname: '/success',
				params: { message: 'Your profile was updated successfully!' },
			});
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
				<View style={styles.spacer}>
					<BackButton />
				</View>

				<Form
					initialValues={{
						fullName: auth.user?.fullName,
						email: auth.user?.email,
						phoneNumber: auth.user?.phoneNumber,
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
								name="fullName"
								placeholder="Full Name"
								keyboardType="name-phone-pad"
							/>

							<FormField
								autoCapitalize="none"
								name="email"
								placeholder="Email Address"
								keyboardType="email-address"
								editable={false}
								tip="Your email is not editable"
							/>

							<FormField
								autoCapitalize="none"
								keyboardType="phone-pad"
								name="phoneNumber"
								placeholder="Phone Number"
								phoneData={utils.defaultCountry ?? undefined}
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
	spacer: { marginBottom: 20 },
});

export default EditProfileScreen;