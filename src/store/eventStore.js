/**
 * This class to toggle event add currency to list only view
 * I'm use store, because easy to handle and access data event.
 */
import { observable, action, computed } from "mobx";

class EventStore {
  constructor(rootstore) {
    this.rootstore = rootstore;
  }

  @observable
  add_currency = false;

  @computed
  get add_mode() {
    /**
     * Function to get add_currency from  store
     */
    return this.add_currency;
  }

  @action
  changeMode = () => {
    /**
     * Action to change mode add_currency
     */
    this.add_currency = !this.add_currency;
  };
}

//Export with new EventStore initalization
export default new EventStore();
