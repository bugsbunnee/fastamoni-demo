import { useColorScheme } from 'react-native';

import Colors from '../constants/Colors';
import { useAppSelector } from '@/store/configureStore';
import { getUtils } from '@/store/utils';

const useColor = () => {
	const utils = useAppSelector(getUtils);

	if (utils.theme) {
		return Colors[utils.theme];
	}

	return Colors.light;
};

export default useColor;
