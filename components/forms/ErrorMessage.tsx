import React from 'react';
import Text from '@/components/themed/Text';

import { StyleSheet, View } from 'react-native';

import useColor from '@/hooks/useColor';

interface ErrorMessageProps {
	errorMessage?: string;
	isVisible: boolean;
}

const ErrorMessage = (props: ErrorMessageProps) => {
	if (!props.isVisible || !props.errorMessage) return null;

	const color = useColor();

	return (
		<View style={[styles.container, { backgroundColor: color.dangerLight }]}>
			<Text style={[styles.text, { color: color.danger }]}>
				{props.errorMessage}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 15,
		borderRadius: 5,
	},
	text: {
		fontSize: 13,
		textAlign: 'center',
	},
});

export default ErrorMessage;
