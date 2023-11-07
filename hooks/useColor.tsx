import Colors from '@/utils/colors';

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
