import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";
import "./ItemTable.css";
import {InputField} from '../InputField/InputField.js'

export const ItemTable = observer(({ store }) => {
  const handleCount = useCallback(
    (idx) => {
      return (val) => {
        const value = parseInt(val);
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
              <button type="button" className="button"> x </button>
            </td>
            <td>
              <InputField
                value={item.barcode}
                updateValue={(val) => store.updateBarcode(idx, val)}
                isError={item.fullBarcode == null}
              />
            </td>
            <td>
              <InputField
                value={item.shopName}
                updateValue={(val) => store.updateShopName(idx, val)}
              />
            </td>
            <td>
              <InputField 
                type="number"
                value={item.count}
                placeholder="0"
                updateValue={handleCount(idx)}
              />
            </td>
          </tr>
        ))}
        <tr>
            <td colSpan="4">
            <button type="button" className="button" onClick={() => store.createItem()}>
              Добавить товар
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
});
