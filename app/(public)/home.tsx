import React from 'react';
import Text from '@/components/themed/Text';

import { StyleSheet, View } from 'react-native';

const TabOneScreen: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Tab One</Text>
			<View style={styles.separator} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});

export default TabOneScreen;
