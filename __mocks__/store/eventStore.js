import { observable, action, computed } from "mobx";

class EventStore {
  constructor(rootstore){
    this.rootstore = rootstore;
  }
  @observable
  add_currency = false;

  @computed
  get addMode() {
    // Function to get add_currency from  store
    return this.add_currency;
  }

  @action
  changeMode = () => {
    //Action to change mode add_currency
    this.add_currency = !this.add_currency;
  };
}

export default new EventStore();
