import { useMemo } from "react";
import JsBarcode from "jsbarcode";
import { renderToString, renderToStaticMarkup } from "react-dom/server";

const imageStyle = {
	width: "100%",
	height: "auto",
};

export const Barcode = ({ code, style, width = 58, height = 20 }) => {
	const data = {};
	const element = document.createElement("canvas");
	JsBarcode(element, code, {
		format: "EAN13",
		displayValue: false,
		margin: 0,
		height: 140,
		width: 4,
	});
	// console.log(JsBarcode);
	// console.log(data);
	// const result = data.encodings
	// 	.map((e) => e.data)
	// 	.reduce((acc, item) => acc + item);
	// const idx = result.indexOf("1");
	// const barcode = result.slice(idx);
	// const canvas = document.createElement("canvas");
	// const canvg = new Canvg(
	// 	canvas,
	// 	renderToString(<SvgImage barcode={barcode} width={width} height={height} />)
	// );

	const image = element.toDataURL("image/png");

	return <img src={image} style={imageStyle} alt="" />;
};
