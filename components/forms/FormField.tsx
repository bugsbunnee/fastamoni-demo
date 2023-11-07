import React from 'react';
import { useFormikContext, FormikValues } from 'formik';
import { DimensionValue, TextInputProps } from 'react-native';
import { CountryData } from '../../utils/models';

import TextInput from '../themed/TextInput';

interface FormFieldProps extends TextInputProps {
	name: string;
	width?: DimensionValue;
	tip?: string;
	phoneData?: CountryData;
}

const FormField: React.FC<FormFieldProps> = ({
	name,
	width,
	...otherProps
}) => {
	const { setFieldTouched, setFieldValue, errors, touched, values } =
		useFormikContext();

	return (
		<TextInput
			onBlur={() => setFieldTouched(name)}
			onChangeText={(text: string) => setFieldValue(name, text)}
			value={(values as FormikValues)[name]}
			width={width}
			onClearField={() => setFieldValue(name, '')}
			error={(touched as any)[name] ? (errors as any)[name] : null}
			{...otherProps}
		/>
	);
};

export default FormField;
