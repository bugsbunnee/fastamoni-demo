import React from 'react';
import {
	StyleProp,
	StyleSheet,
	Text,
	TextProps,
	TextStyle,
} from 'react-native';

import useColor from '../../hooks/useColor';

interface CustomTextProps extends TextProps {
	children: React.ReactNode;
	style?: StyleProp<TextStyle>;
}

const CustomText = ({ children, style, ...otherProps }: CustomTextProps) => {
	const colors = useColor();

	return (
		<Text style={[{ color: colors.text }, styles.text, style]} {...otherProps}>
			{children}
		</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		fontFamily: 'SpaceMono',
	},
});

export default CustomText;
