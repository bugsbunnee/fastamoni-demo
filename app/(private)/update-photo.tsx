import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Link, router } from 'expo-router';

import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '@/store/configureStore';
import { updateUserPhoto } from '@/store/auth/handlers';
import { getAuth, login } from '@/store/auth';
import { User } from '@/utils/models';

import ActivityIndicator from '@/components/themed/ActivityIndicator';
import BackButton from '@/components/themed/BackButton';
import Form from '@/components/forms/Form';
import FormImagePicker from '@/components/forms/FormImagePicker';
import Text from '@/components/themed/Text';
import Screen from '@/components/themed/Screen';
import SubmitButton from '@/components/forms/SubmitButton';

interface FormValues {
	uri: string;
}

const validationSchema = Yup.object().shape({
	uri: Yup.string().required().label('Image'),
});

const UpdatePhotoScreen: React.FC = () => {
	const auth = useAppSelector(getAuth);
	const dispatch = useAppDispatch();

	const handleSubmit = async (values: FormValues) => {
		const payload = { ...values, userId: auth.user?.id as number };

		try {
			const result = await dispatch(updateUserPhoto(payload)).unwrap();
			const user = { ...(auth.user as User), imageUri: result.data.uri };

			dispatch(login(user));

			router.push({
				pathname: '/success',
				params: { message: 'Your photo was updated successfully!' },
			});
		} catch (error) {
			alert((error as Error).message);
		}
	};

	return (
		<Screen>
			<ActivityIndicator isVisible={auth.isAuthenticating} />

			<View style={styles.container}>
				<BackButton />

				<View style={styles.content}>
					<View style={styles.addPhotoView}>
						<Text style={styles.addPhoto}>Add a Photo</Text>
						<Text style={styles.tapText}>
							Tap the icon below to add a photo to this profile
						</Text>
					</View>

					<Form
						initialValues={{ uri: auth.user?.imageUri }}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
					>
						<FormImagePicker name="uri" />

						<View style={styles.photoTip}>
							<Text style={styles.photoTipHeader}>Photo Tips</Text>
							<Text style={styles.photoTipItem}>Choose a clear image.</Text>
						</View>

						<View style={styles.buttons}>
							<SubmitButton label="Save" />

							<Link href="/home" style={styles.spacer}>
								<Text style={styles.skipText}>Skip</Text>
							</Link>
						</View>
					</Form>
				</View>
			</View>
		</Screen>
	);
};

const styles = StyleSheet.create({
	addPhoto: {
		textAlign: 'center',
		fontWeight: '700',
		fontSize: 18,
		paddingVertical: 10,
	},
	addPhotoView: { marginVertical: 30 },
	buttons: { flex: 1, justifyContent: 'flex-end', width: '100%' },
	content: {
		flex: 1,
		alignItems: 'center',
	},
	container: { flex: 1, padding: 20 },
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	photoTip: { marginVertical: 20 },
	photoTipHeader: { fontSize: 13, textAlign: 'center' },
	photoTipItem: {
		fontSize: 13,
		textAlign: 'center',
	},
	skipText: {
		textAlign: 'center',
		paddingVertical: 10,
		fontSize: 14,
	},
	spacer: { marginTop: 20 },
	tapText: { textAlign: 'center', fontSize: 14 },
	topContainer: { height: 60 },
});

export default UpdatePhotoScreen;
