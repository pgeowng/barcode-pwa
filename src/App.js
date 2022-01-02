import { useState } from "react";
import { observer } from "mobx-react-lite";
import { BarcodeStore } from "./BarcodeStore.js";
import { ItemTable } from "./components/ItemTable/ItemTable.js";
import { Actions } from "./components/Actions/Actions.js";
import "./App.css";

export const App = observer(() => {
  const [store] = useState(() => new BarcodeStore());
  return (
    <div className="app">
      <div className="app__table">
        <ItemTable store={store} />
      </div>
      <div className="app__actions">
        <Actions store={store} />
      </div>
    </div>
  );
});
