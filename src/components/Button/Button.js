import './Button.css'
export const Button = ({ children, onClick = () => {} }) => {
	return (
		<button type="button" className="button">
			{children}
		</button>
	);
};
