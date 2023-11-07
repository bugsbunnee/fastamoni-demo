import React from 'react';
import Text from './Text';

import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import useColor from '../../hooks/useColor';

interface CustomButtonProps {
	disabled?: boolean;
	label: string;
	onPress: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
	disabled,
	label,
	onPress,
}) => {
	const opacity = disabled ? 0.5 : 1;
	const colors = useColor();

	return (
		<TouchableOpacity
			disabled={disabled}
			onPress={onPress}
			style={[styles.button, { opacity, backgroundColor: colors.tint }]}
		>
			<Text style={styles.text}>{label}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 15,
		paddingVertical: 15,
		width: '100%',
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 15,
		fontWeight: '600',
		fontFamily: 'SpaceMono',
	},
});

export default CustomButton;
