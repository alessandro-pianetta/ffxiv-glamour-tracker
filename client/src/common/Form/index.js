import React from "react";

export default function ({ formProps, inputs }) {
	return (
		<form {...formProps}>
			{inputs.map((input) => {
				return (
					<label>
						{input.label}
						<input {...input} />
					</label>
				);
			})}
			<input type="submit" />
		</form>
	);
}
