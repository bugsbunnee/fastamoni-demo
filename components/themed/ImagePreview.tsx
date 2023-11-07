import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '@/components/themed/Screen';

import useColor from '@/hooks/useColor';

interface ImagePreviewProps {
	imageUri: string | null;
	onClosePreview: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
	imageUri,
	onClosePreview,
}) => {
	const color = useColor();

	return (
		<Modal visible={!!imageUri} animationType="slide">
			<Screen style={[styles.container, { backgroundColor: color.background }]}>
				<TouchableOpacity onPress={onClosePreview} style={styles.closeIcon}>
					<MaterialCommunityIcons name="close" color={color.text} size={35} />
				</TouchableOpacity>

				<Image
					style={styles.image}
					source={imageUri}
					contentFit="contain"
					transition={1000}
				/>
			</Screen>
		</Modal>
	);
};

const styles = StyleSheet.create({
	closeIcon: {
		position: 'absolute',
		top: 40,
		right: 30,
		zIndex: 99999,
	},
	container: {
		flex: 1,
	},
	deleteIcon: {
		position: 'absolute',
		top: 40,
		right: 30,
	},
	image: {
		width: '100%',
		height: '100%',
	},
});

export default ImagePreview;
