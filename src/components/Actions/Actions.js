import jsPDF from "jspdf";
import { useState, useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { autorun, computed } from "mobx";

import { BarcodePage } from "../BarcodePage/BarcodePage.js";


const EndDocument = ({ store, style = {} }) => {
	let i = 0;

	return [].concat(
		...store.items.map((item, i) => {
			return Array(item.count)
				.fill(null)
				.map((_, j) => (
					<BarcodePage item={item} />
				));
		})
	);
};

const renderPDF = (store) => {
	const htmlString = renderToStaticMarkup(<EndDocument store={store} />);
	console.log(htmlString);
	const doc = new jsPDF({
		orientation: "l",
		unit: "mm",
		format: [58, 40],
		hotfixes: ["px_scaling"],
	});

	return new Promise((res, rej) => {
		doc.setFont("SourceSansPro-Regular");
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

export const Actions = observer(({ store }) => {
	const [liveUpdate, setLiveUpdate] = useState(true);
	const [dataURI, setDataURI] = useState("");
	const [error, setError] = useState('')

	useEffect(() => {
		if (liveUpdate)
			return autorun(
				async () => {
					if (store.items.reduce((acc, n) => acc && n.fullBarcode != null, true)) {
					setDataURI(await renderPDF(store))
					setError('')
					} else {
						setError('ошибка в воде кода!')
					}

				},
				{ delay: updateTimeout }
			);
	}, [store, liveUpdate]);

	return (
		<div className="Preview">
			{error.length === 0 ? '' : <>{error}<br/></>}
			<input
				id="enableLiveUpdate"
				type="checkbox"
				checked={liveUpdate}
				onChange={(e) => setLiveUpdate(!liveUpdate)}
			/>
			<label for="enableLiveUpdate">Обновлять превью</label><br/>
			Items: {store.items.reduce((acc, item) => item.count + acc, 0)}
			<br/>
			<button type="button">preview</button>
			<br/>
			{liveUpdate ? <iframe src={dataURI} /> : null}
			<br/>
			{store.items.map(item => <BarcodePage item={item} isPreview={true}/>)}
		</div>
	);
});
