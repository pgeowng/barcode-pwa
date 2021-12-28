import { BarcodeStore } from "./BarcodeStore.js";
import { ItemTable } from "./ItemTable.js";
import { PdfPreview } from "./PdfPreview.js";
import "./App.css";

function App() {
  const store = new BarcodeStore();
  return (
    <div className="App">
      <ItemTable store={store} />
      <PdfPreview />
    </div>
  );
}

export default App;
