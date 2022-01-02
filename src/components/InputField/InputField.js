import { useCallback } from "react";
import "./InputField.css"

export const InputField = ({
	type = "text",
	value = "",
	placeholder = "0",
	updateValue = () => {},
	isError = false,
}) => {
	const onChange = useCallback(
		(e) => {
			updateValue(e.target.value);
		},
		[updateValue]
	);

	return (
		<input
			className={`input ${isError ? "input--error" : ""}`}
			type={type}
			value={value == null || value==="" || value === placeholder ? "" : value}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
};
