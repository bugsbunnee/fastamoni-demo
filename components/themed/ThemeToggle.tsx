import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useAppDispatch, useAppSelector } from '@/store/configureStore';
import { getUtils, setTheme } from '@/store/utils';

import useColor from '@/hooks/useColor';

const ThemeToggle: React.FC = () => {
	const utils = useAppSelector(getUtils);
	const dispatch = useAppDispatch();
	const color = useColor();

	const handleThemeToggle = () => {
		dispatch(setTheme(utils.theme === 'light' ? 'dark' : 'light'));
	};

	return (
		<TouchableOpacity
			style={[styles.container, { backgroundColor: color.tint }]}
			onPress={handleThemeToggle}
		>
			<MaterialCommunityIcons
				size={30}
				color={color.text}
				name={
					utils.theme === 'light'
						? 'white-balance-sunny'
						: 'moon-waning-gibbous'
				}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		right: 20,
		bottom: 20,
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 30,
	},
});

export default ThemeToggle;
