import { makeObservable, observable, action, runInAction } from "mobx";

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
    });
  }

  updateItem(idx, update) {
    if (idx < 0 || idx >= this.items.size) return null;
    this.items[idx] = update;
    return this.items[idx];
  }

  updateBarcode(idx, update) {
    console.log("updating state");
    this.items[idx].barcode = update;
  }
  updateShopName(idx, update) {
    console.log("updating state");
    this.items[idx].shopName = update;
  }
  updateCount(idx, update) {
    console.log("updating", update);
    this.items[idx].count = update;
  }

  prefetchData = () => {
    setTimeout(() => {
      this.createItem({
        id: Date.now(),
        barcode: "12314412",
        shopName: "Some Long Shop Name",
        count: 4,
      });
    }, 1000);
  };
}
