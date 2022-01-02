import jsPDF from "jspdf";
import { useState, useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { autorun, computed } from "mobx";

import { Barcode } from "./Barcode.js";

const cardStyle = {
	height: "80px",
	width: "116px",
	boxSizing: "border-box",
	// border: "1px solid #0f0",
	// backgroundColor: "#f32",
	fontFamily: "'Source Sans Pro', sans-serif",
	// fontFamily: "'Noto Sans', sans-serif",
	padding: "8px",
	border: "1px solid #0005",
};

const barcodeContainerStyle = {
	width: "100%",
	display: "flex",
	alignItems: "center",
};

const barcodeStyle = {
	width: "100%",
	height: "auto",
	marginLeft: "8px",
	marginRight: "8px",
};

const barcodeProps = {
	width: 100,
};

const textStyle = {
	margin: "0",
	fontSize: "10px",
	textAlign: "center",
};

const Document = ({ store, style = {} }) => {
	let i = 0;

	return [].concat(
		...store.items.map((item, i) => {
			return Array(item.count)
				.fill(null)
				.map((_, j) => (
					<div style={{ ...cardStyle, ...style }}>
						<div style={barcodeContainerStyle}>
							<Barcode code={item.barcode} style={barcodeStyle} />
						</div>
						<p style={textStyle}>{item.barcode}</p>
						<p style={textStyle}>{item.shopName}</p>
					</div>
				));
		})
	);
};

const renderPDF = (store) => {
	const htmlString = renderToStaticMarkup(<Document store={store} />);
	console.log(htmlString);
	const doc = new jsPDF({
		orientation: "l",
		unit: "mm",
		format: [58, 40],
		hotfixes: ["px_scaling"],
	});

	return new Promise((res, rej) => {
		doc.setFont("SourceSansPro-Regular");
		// doc.addPage();
		// doc.addSvgAsImage(
		// 	renderToString(<Barcode code="5034504935778" style={barcodeStyle} />),
		// 	0,
		// 	0,
		// 	20,
		// 	20,
		// 	"5034504935778",
		// 	"NONE",
		// 	0
		// );

		// res(doc.output("datauristring"));
		doc.html(htmlString, {
			callback: (doc) => {
				doc.deletePage(
					store.items.reduce((acc, item) => item.count + acc, 0) + 1
				);
				res(doc.output("datauristring"));
			},
			width: 58,
			windowWidth: 116,
			html2canvas: {
				// width: 136,
				// height: 80,
				// scale: 0.5,
			},
			fontFaces: [
				{
					family: "Source Sans Pro",
					src: [
						{
							url: "source-sans-pro/SourceSansPro-Regular.ttf",
							format: "truetype",
						},
					],
				},
			],
		});
	});
};

const updateTimeout = 3000;

export const PdfPreview = observer(({ store }) => {
	const [liveUpdate, setLiveUpdate] = useState(true);
	const [dataURI, setDataURI] = useState("");

	useEffect(() => {
		if (liveUpdate)
			return autorun(
				async () => {
					setDataURI(await renderPDF(store));
				},
				{ delay: updateTimeout }
			);
	}, [store, liveUpdate]);

	return (
		<div className="Preview">
			<input
				id="enableLiveUpdate"
				type="checkbox"
				checked={liveUpdate}
				onChange={(e) => setLiveUpdate(!liveUpdate)}
			/>
			<label for="enableLiveUpdate">Обновлять превью</label>
			Items: {store.items.reduce((acc, item) => item.count + acc, 0)}
			<button type="button">preview</button>
			<iframe src={dataURI} />
			<Document store={store} style={{ display: "inline-block" }} />
		</div>
	);
});
