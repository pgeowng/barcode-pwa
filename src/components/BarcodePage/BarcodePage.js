import { useMemo } from "react";
import JsBarcode from "jsbarcode";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import './BarcodePage.css'

const imageStyle = {
	width: "100%",
	height: "auto",
};

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

	return <div class={`barcode-page ${isPreview ? 'barcode-page--preview' : ''}`}>
		<div class="barcode-page__barcode">
			<Barcode code={item.barcode} />
		</div>
		<p class="barcode-page__text barcode-text">{item.barcode}</p>
		<p class="barcode-page__text barcode-text">{item.shopName}</p>
	</div>
}