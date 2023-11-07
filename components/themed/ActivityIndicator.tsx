import React from 'react';
import LottieView from 'lottie-react-native';

import { View, StyleSheet } from 'react-native';
import useColor from '../../hooks/useColor';
import loadingAnimation from '../../assets/animations/loading.json';

interface ActivityIndicatorProps {
	isVisible: boolean;
}

const ActivityIndicator: React.FC<ActivityIndicatorProps> = ({ isVisible }) => {
	if (!isVisible) return null;

	const color = useColor();

	return (
		<View style={[styles.overlay, { backgroundColor: color.background }]}>
			<LottieView
				autoPlay
				loop
				source={loadingAnimation}
				style={styles.animation}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	animation: {
		width: 150,
	},
	overlay: {
		position: 'absolute',
		height: '100%',
		opacity: 0.95,
		width: '100%',
		zIndex: 20,
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
});

export default ActivityIndicator;
