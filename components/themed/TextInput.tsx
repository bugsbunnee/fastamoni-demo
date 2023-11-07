import React, { useState } from 'react';
import { Image } from 'expo-image';

import {
	TextInput,
	StyleSheet,
	View,
	TextInputProps,
	NativeSyntheticEvent,
	TextInputFocusEventData,
	DimensionValue,
	Pressable,
} from 'react-native';
import { CountryData } from '../../utils/models';

import ErrorMessage from '../forms/ErrorMessage';
import Text from './Text';

import useColor from '../../hooks/useColor';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CustomTextInputProps extends TextInputProps {
	width?: DimensionValue;
	label?: string;
	tip?: string;
	error?: string;
	phoneData?: CountryData;
	onClearField: () => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
	width = '100%',
	error,
	label,
	tip,
	onBlur,
	onFocus,
	onClearField,
	phoneData,
	...otherProps
}) => {
	const [isFocused, setIsFocused] = useState(false);
	const color = useColor();

	const getFocusedStyle = () => {
		return {
			width,
			borderColor: isFocused
				? color.text
				: error
				? color.dangerLight
				: color.tint,
			backgroundColor: isFocused
				? color.background
				: error
				? color.dangerLight
				: color.tint,
		};
	};

	const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		if (onBlur) onBlur(e);
		setIsFocused(false);
	};

	const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		if (onFocus) onFocus(e);
		setIsFocused(true);
	};

	return (
		<View style={[styles.containerMargin, { width }]}>
			{label && <Text style={styles.label}>{label}</Text>}

			<View style={[styles.container, { width }, getFocusedStyle()]}>
				{phoneData ? (
					<View style={styles.phoneDetails}>
						<Image
							style={styles.flag}
							source={phoneData.flags.png}
							contentFit="contain"
							transition={1000}
						/>

						<Text style={styles.phoneDetailsCode}>
							{phoneData.idd.root}
							{phoneData.idd.suffixes[0]}
						</Text>
					</View>
				) : null}

				<TextInput
					{...otherProps}
					style={[styles.text, { color: color.text }]}
					selectionColor={color.tabIconSelected}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>

				{otherProps.value && otherProps.value.length > 0 ? (
					<Pressable onPress={onClearField}>
						<MaterialCommunityIcons
							name="close-circle"
							color={color.text}
							size={25}
						/>
					</Pressable>
				) : null}
			</View>

			<View style={styles.errorMessageContainer}>
				<ErrorMessage isVisible={!!error} errorMessage={error} />
			</View>

			{tip ? <Text style={styles.tip}>{tip}</Text> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 8,
		flexDirection: 'row',
		paddingVertical: 15,
		paddingHorizontal: 15,
		alignItems: 'center',
	},
	containerMargin: {
		marginVertical: 10,
	},
	errorMessageContainer: {
		marginTop: 10,
	},
	flag: {
		width: 20,
		height: 20,
	},
	icon: { marginRight: 10 },
	label: {
		fontSize: 14,
		paddingVertical: 5,
		fontWeight: '700',
	},
	phoneDetails: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 10,
	},
	phoneDetailsCode: { fontSize: 13, paddingHorizontal: 5 },
	text: {
		fontSize: 14,
		fontFamily: 'SpaceMono',
		flex: 1,
	},
	tip: {
		fontSize: 13,
		fontWeight: '500',
		marginTop: 10,
		textAlign: 'center',
	},
});

export default CustomTextInput;
