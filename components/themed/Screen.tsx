import React from 'react';
import Constants from 'expo-constants';
import {
	SafeAreaView,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';

interface ScreenProps {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}

const Screen: React.FC<ScreenProps> = ({ children, style }) => {
	return (
		<SafeAreaView style={[styles.screen, style]}>
			<View style={[styles.container, style]}>{children}</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1 },
	screen: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
	},
});

export default Screen;
