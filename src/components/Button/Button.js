import './Button.css'
export const Button = ({ children, onClick = () => {}, isIcon = false }) => {
	return (
		<button type="button" className={`button ${isIcon ? 'button--icon' : ''}`}>
			{children}
		</button>
	);
};
