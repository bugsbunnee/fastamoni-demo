import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
	Appearance,
	StyleSheet,
	TouchableOpacity,
	useColorScheme,
} from 'react-native';

import useColor from '@/hooks/useColor';

const ThemeToggle: React.FC = () => {
	const colorScheme = useColorScheme();
	const color = useColor();

	const handleThemeToggle = () => {
		Appearance.setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
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
					colorScheme === 'light'
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
