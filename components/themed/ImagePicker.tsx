import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as ImagePicker from 'expo-image-picker';

import useColor from '@/hooks/useColor';

interface ImageInputProps {
	imageUri: string;
	onChangeImage: (imageUri: string | null) => void;
}

const ImageInput = (props: ImageInputProps) => {
	const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
	const color = useColor();

	const onImageSelect = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({ quality: 1 });
			if (!result.canceled) props.onChangeImage(result.assets[0].uri);
		} catch (error) {
			console.log('Error reading an image', error);
		}
	};

	useEffect(() => {
		if (status === null) requestPermission();
	}, [status]);

	return (
		<TouchableOpacity onPress={onImageSelect}>
			<View style={[styles.container, { backgroundColor: color.tint }]}>
				{props.imageUri ? (
					<Image
						style={styles.image}
						source={props.imageUri}
						placeholder="|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj["
						contentFit="cover"
						transition={1000}
					/>
				) : (
					<MaterialCommunityIcons name="camera" size={100} color={color.text} />
				)}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		borderRadius: 70,
		height: 130,
		justifyContent: 'center',
		marginVertical: 10,
		overflow: 'hidden',
		width: 130,
	},
	image: {
		height: 130,
		width: 130,
		borderRadius: 75,
	},
});

export default ImageInput;
