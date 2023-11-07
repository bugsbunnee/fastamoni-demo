import React from 'react';
import { FormikValues, useFormikContext } from 'formik';

import ErrorMessage from '@/components/forms/ErrorMessage';
import ImageInput from '../themed/ImagePicker';

interface FormikImagePickerProps {
	name: string;
}

const FormImagePicker: React.FC<FormikImagePickerProps> = ({ name }) => {
	const { errors, setFieldValue, touched, values } =
		useFormikContext<FormikValues>();

	return (
		<>
			<ImageInput
				imageUri={values[name]}
				onChangeImage={(uri) => setFieldValue(name, uri)}
			/>
			<ErrorMessage
				errorMessage={errors[name] as string}
				isVisible={touched[name] as boolean}
			/>
		</>
	);
};

export default FormImagePicker;
