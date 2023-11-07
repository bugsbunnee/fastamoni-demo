import { useColorScheme } from 'react-native';

import Colors from '../constants/Colors';

const useColor = () => {
	const colorScheme = useColorScheme();

	if (colorScheme) {
		return Colors[colorScheme];
	}

	return Colors.light;
};

export default useColor;
