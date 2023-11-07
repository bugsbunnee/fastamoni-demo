import React from 'react';
import { useFormikContext } from 'formik';

import Button from '../themed/Button';

interface SubmitButtonProps {
	label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label }) => {
	const { isSubmitting, handleSubmit } = useFormikContext();

	return (
		<Button disabled={isSubmitting} label={label} onPress={handleSubmit} />
	);
};

export default SubmitButton;
