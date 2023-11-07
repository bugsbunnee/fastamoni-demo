import React from 'react';

import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Text from '@/components/themed/Text';

import useColor from '@/hooks/useColor';

const BackButton = () => {
	const color = useColor();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.back, { backgroundColor: color.tint }]}
				onPress={router.back}
			>
				<MaterialCommunityIcons
					name="arrow-left"
					size={25}
					color={color.text}
				/>
				<Text style={styles.text}>Back</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	back: {
		alignItems: 'center',
		alignSelf: 'flex-start',
		flexDirection: 'row',
		padding: 5,
		borderRadius: 30,
	},
	container: {
		justifyContent: 'center',
	},
	text: {
		fontSize: 14,
		paddingLeft: 5,
	},
});

export default BackButton;
