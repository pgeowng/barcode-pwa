import { useState } from "react";
import { observer } from "mobx-react-lite";
import { BarcodeStore } from "./BarcodeStore.js";
import { ItemTable } from "./ItemTable.js";
import { PdfPreview } from "./PdfPreview.js";
import "./App.css";

export const App = observer(() => {
  const [store] = useState(() => new BarcodeStore());
  return (
    <div className="App">
      <div className="App-InputTable">
        <ItemTable store={store} />
      </div>
      <div className="App-Control">
        <PdfPreview store={store} />
      </div>
    </div>
  );
});
