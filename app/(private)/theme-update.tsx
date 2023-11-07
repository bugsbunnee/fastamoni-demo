import React from 'react';
import Constants from 'expo-constants';

import { FlatList, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeOption } from '@/utils/models';

import BackButton from '@/components/themed/BackButton';
import Text from '@/components/themed/Text';

import { useAppSelector } from '@/store/configureStore';
import { getUtils, setTheme } from '@/store/utils';
import { useAppDispatch } from '../../store/configureStore';

import useColor from '@/hooks/useColor';

const ThemeUpdateScreen: React.FC = () => {
	const utils = useAppSelector(getUtils);
	const dispatch = useAppDispatch();
	const color = useColor();

	const handleClick = (item: ThemeOption) => {
		dispatch(setTheme(item.mode));
	};

	return (
		<View style={[styles.container, { backgroundColor: color.background }]}>
			<View style={styles.spacer}>
				<BackButton />
			</View>

			<View style={styles.content}>
				<Text style={styles.title}>Update the App Theme</Text>

				<FlatList
					data={options}
					keyExtractor={(item) => item.title}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => handleClick(item)}
							style={[styles.option, { backgroundColor: color.tint }]}
						>
							<MaterialCommunityIcons
								name={item.icon}
								size={30}
								color={color.text}
							/>

							<View style={styles.optionDetails}>
								<Text style={[styles.optionTitle, { color: color.text }]}>
									{item.title}
								</Text>
								<Text style={[styles.optionSubtitle, { color: color.text }]}>
									{item.subtitle}
								</Text>
							</View>

							{item.mode === utils.theme ? (
								<MaterialCommunityIcons
									name="check-circle"
									color={color.text}
									size={25}
								/>
							) : null}
						</TouchableOpacity>
					)}
				/>
			</View>
		</View>
	);
};

const options: ThemeOption[] = [
	{
		mode: 'light',
		icon: 'white-balance-sunny',
		title: 'Light mode',
		subtitle: 'Easy on the eyes',
	},
	{
		mode: 'dark',
		icon: 'moon-waning-gibbous',
		title: 'Dark mode',
		subtitle: 'Beautiful Illusion',
	},
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212',
		paddingHorizontal: 20,
		paddingVertical: Constants.statusBarHeight,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
	},
	option: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5,
	},
	optionDetails: { flex: 1, marginLeft: 20 },
	optionSubtitle: { color: 'white', fontSize: 13 },
	optionTitle: { color: 'white', textTransform: 'capitalize' },
	separator: {
		width: '100%',
		height: 2,
		marginVertical: 10,
	},
	spacer: { marginTop: 8, marginBottom: 15 },
	title: {
		fontSize: 18,
		marginTop: 15,
		marginBottom: 30,
	},
});

export default ThemeUpdateScreen;
