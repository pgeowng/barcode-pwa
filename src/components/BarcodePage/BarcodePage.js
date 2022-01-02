import JsBarcode from "jsbarcode";
import './BarcodePage.css'

const Barcode = ({ code, style, width = 58, height = 20 }) => {
	const element = document.createElement("canvas");
	JsBarcode(element, code, {
		format: "EAN13",
		displayValue: false,
		margin: 0,
		height: 140,
		width: 4,
	});

	const image = element.toDataURL("image/png");

	return <img src={image} className="barcode-img" alt="barcode" />;
};

export const BarcodePage = ({item, isPreview=false}) => {
	return <div className={`barcode-page ${isPreview ? 'barcode-page--preview' : ''}`}>
		<div className="barcode-page__barcode">
			<Barcode code={item.fullBarcode} />
		</div>
		<p className="barcode-page__text barcode-text">{item.fullBarcode}</p>
		<p className="barcode-page__text barcode-text">{item.shopName}</p>
	</div>
}