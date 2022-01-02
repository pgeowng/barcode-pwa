import { makeObservable, observable, action, runInAction } from "mobx";

const ean13checksum = (data) => {
  const res = data
    .substr(0, 12)
    .split("")
    .map((num) => parseInt(num, 10))
    .reduce((sum, n, idx) => sum + (idx % 2 ? n * 3 : n), 0);

  const num = (10 - (res % 10)) % 10;
  console.log("checksum", data, num);
  return num;
};

const fullBarcode = (item) => {
  return item == null || item.barcode == null
    ? null
    : item.barcode.length === 12
    ? item.barcode + ean13checksum(item.barcode)
    : item.barcode.length === 13 &&
      +item.barcode[12] === ean13checksum(item.barcode)
    ? item.barcode
    : null;
};

export class BarcodeStore {
  items = [];

  constructor() {
    makeObservable(this, {
      items: observable,
      createItem: action,
      updateItem: action,
      updateBarcode: action,
      updateShopName: action,
      updateCount: action,
    });
    runInAction(this.prefetchData);
  }

  createItem(item) {
    this.items.push({
      id: Date.now(),
      barcode: "",
      shopName: "",
      count: 0,
      ...item,
      fullBarcode: fullBarcode(item)
    });
  }

  updateItem(idx, update) {
    if (idx < 0 || idx >= this.items.size) return null;
    this.items[idx] = { ...update, fullBarcode: fullBarcode(update) };
    return this.items[idx];
  }

  updateBarcode(idx, update) {
    this.items[idx].barcode = update;
    this.items[idx].fullBarcode = fullBarcode(this.items[idx]);
  }
  updateShopName(idx, update) {
    this.items[idx].shopName = update;
  }
  updateCount(idx, update) {
    this.items[idx].count = update;
  }

  prefetchData = () => {
    setTimeout(() => {
      this.createItem({
        id: Date.now(),
        barcode: "5034504935778",
        shopName: "Some Long Shop Name",
        count: 4,
      });
      this.createItem({
        id: Date.now(),
        barcode: "1234567890128",
        shopName: "Another shop name",
        count: 4,
      });
    }, 1000);
  };
}
