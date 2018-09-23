import currencyStore from "./currencyStore";
import eventStore from "./eventStore";
import searchStore from "./searchStore";

class RootStore {
  constructor() {
    this.currencyStore = currencyStore;
    this.eventStore = eventStore;
    this.searchStore = searchStore;
  }
}

export default new RootStore();
