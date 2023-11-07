import React, { useState } from 'react';
import Constants from 'expo-constants';

import {
	Pressable,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { router } from 'expo-router';
import { openURL } from 'expo-linking';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Icon, User } from '@/utils/models';
import { useAppSelector } from '@/store/configureStore';

import ImagePreview from '@/components/themed/ImagePreview';
import ProfileButton from '@/components/themed/ProfileButton';
import Text from '@/components/themed/Text';

import useColor from '@/hooks/useColor';

interface Setting {
	route: any;
	label: string;
	icon: Icon;
}

const HomeScreen: React.FC = () => {
	const [imageUriPreview, setImageUriPreview] = useState<string | null>(null);

	const color = useColor();
	const user = useAppSelector((state) => state.auth.user as User);

	const handlePhoneCall = () => {
		openURL('tel:+2348142317489');
	};

	return (
		<View style={[styles.container, { backgroundColor: color.background }]}>
			<ImagePreview
				imageUri={imageUriPreview}
				onClosePreview={() => setImageUriPreview(null)}
			/>

			<ScrollView>
				<View style={[styles.overview, { backgroundColor: color.tint }]}>
					<Text style={styles.title}>Welcome to FastaMoni</Text>

					<View style={styles.user}>
						<View style={styles.superFlex}>
							<Text numberOfLines={1} style={styles.fullName}>
								{user.fullName}
							</Text>
							<Text style={styles.sectionTitle}>{user.email}</Text>
						</View>

						{user.imageUri ? (
							<Pressable onPress={() => setImageUriPreview(user.imageUri)}>
								<Image
									style={styles.image}
									source={user.imageUri}
									contentFit="cover"
									transition={1000}
								/>
							</Pressable>
						) : (
							<View style={[styles.icon, { backgroundColor: color.primary }]}>
								<MaterialCommunityIcons
									name="account"
									size={25}
									color={color.tint}
								/>
							</View>
						)}
					</View>

					<TouchableOpacity
						onPress={handlePhoneCall}
						style={[styles.phoneCall, { backgroundColor: color.dangerLight }]}
					>
						<MaterialCommunityIcons
							color={color.danger}
							size={13}
							name="phone"
						/>
						<Text style={[styles.phoneCallText, { color: color.danger }]}>
							{user.phoneNumber}
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.spacer}>
					<Text style={styles.sectionTitle}>Profile</Text>

					<View style={styles.section}>
						{profileSettings.map((setting) => (
							<ProfileButton
								key={setting.label}
								icon={setting.icon}
								label={setting.label}
								onPress={() => router.push(setting.route)}
							/>
						))}
					</View>
				</View>

				<View style={styles.spacer}>
					<Text style={styles.sectionTitle}>App</Text>

					<View style={styles.section}>
						<ProfileButton
							onPress={() => router.push('/theme-update')}
							label="Change Theme"
							icon="theme-light-dark"
						/>
					</View>
				</View>
			</ScrollView>

			<View style={styles.logout}>
				<ProfileButton
					onPress={() => router.push('/logout')}
					label="Logout"
					icon="logout"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
		paddingVertical: Constants.statusBarHeight,
		flex: 1,
	},
	fullName: { fontSize: 14 },
	icon: {
		width: 50,
		height: 50,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5,
		padding: 15,
		marginBottom: 10,
	},
	itemText: { fontSize: 13, paddingLeft: 20, flex: 1 },
	image: {
		width: 50,
		height: 50,
		resizeMode: 'contain',
		borderRadius: 30,
	},
	logout: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	overview: { padding: 15, borderRadius: 5 },
	phoneCall: {
		padding: 10,
		alignSelf: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5,
		marginTop: 20,
	},
	phoneCallText: { fontSize: 13, marginLeft: 10 },
	section: {
		marginTop: 10,
	},
	sectionTitle: { fontSize: 12 },
	superFlex: { flex: 1 },
	spacer: { marginTop: 20 },
	title: { fontSize: 16 },
	user: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
});

const profileSettings: Setting[] = [
	{
		route: '/update-photo',
		label: 'Update Photo',
		icon: 'camera',
	},
	{
		route: '/edit-profile',
		label: 'Edit profile',
		icon: 'cog',
	},
	{
		route: '/password-update',
		label: 'Change Password',
		icon: 'form-textbox-password',
	},
];

export default HomeScreen;
