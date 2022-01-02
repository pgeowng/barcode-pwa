import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import "./ItemTable.css";

export const ItemTable = observer(({ store }) => {
  const handleCount = useCallback(
    (idx) => {
      return (e) => {
        const value = parseInt(e.target.value || 0);
        if (!isNaN(value)) store.updateCount(idx, value);
      };
    },
    [store]
  );

  return (
    <table className="item-table">
      <thead>
        <tr>
          <th></th>
          <th> Штрихкод </th>
          <th> Имя продавца </th>
          <th> Количество товара </th>
        </tr>
      </thead>
      <tbody>
        {store.items.map((item, idx) => (
          <tr key={item.id}>
            <td>
              <button type="button"> x </button>
            </td>
            <td>
              <input
                className={`input ${item.fullBarcode == null ? 'error' : ''}`}
                type="text"
                value={item.barcode}
                onChange={(e) => store.updateBarcode(idx, e.target.value)}
              />
            </td>
            <td>
              <input
                className="input"
                type="text"
                value={item.shopName}
                onChange={(e) => store.updateShopName(idx, e.target.value)}
              />
            </td>
            <td>
              <input
                className="input"
                type="number"
                value={item.count === 0 ? "" : item.count}
                placeholder="0"
                onChange={handleCount(idx)}
              />
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan="4">
            <button type="button" onClick={() => store.createItem()}>
              Добавить товар
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
});
