import React from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Icon } from '@/utils/models';

import Text from '@/components/themed/Text';

import useColor from '@/hooks/useColor';

interface Props {
	icon: Icon;
	label: string;
	onPress: () => void;
}

const ProfileButton: React.FC<Props> = ({ icon, label, onPress }) => {
	const color = useColor();

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.item, { backgroundColor: color.tint }]}
		>
			<MaterialCommunityIcons color={color.text} size={25} name={icon} />
			<Text style={styles.itemText}>{label}</Text>
			<MaterialCommunityIcons color={color.text} size={20} name="arrow-right" />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5,
		padding: 15,
		marginBottom: 10,
	},
	itemText: { fontSize: 13, paddingLeft: 20, flex: 1 },
});

export default ProfileButton;
