import { makeObservable, observable, action, runInAction } from "mobx";

export class BarcodeStore {
  items = [];

  constructor() {
    makeObservable(this, {
      items: observable,
      createItem: action,
      updateItem: action,
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

  prefetchData = () => {
    setTimeout(() => {
      this.createItem({
        id: Date.now(),
        barcode: "12314412",
        shopName: "Shop Family",
        count: 4,
      });
    }, 1000);
  };
}
