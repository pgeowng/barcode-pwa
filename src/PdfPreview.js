import jsPDF from "jspdf";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

export const PdfPreview = observer(({ store }) => {
	const [dataURI, setDataURI] = useState("");
	useEffect(() => {
		const doc = new jsPDF({
			orientation: "l",
			unit: "mm",
			format: [58, 40],
		});
		store.items.forEach((item, idx, arr) => {
			doc.text(20, 20, item.barcode);
			doc.text(20, 30, item.shopName);
			if (idx + 1 !== arr.length) doc.addPage();
		});
		setDataURI(doc.output("datauristring"));
	}, [store]);
	return <iframe src={dataURI} />;
});
