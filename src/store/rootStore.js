/**
 * This class is mobx class, be used to merge all store in this application;
 */

import currencyStore from "./currencyStore";
import eventStore from "./eventStore";
class RootStore {
  constructor() {
    this.currencyStore = currencyStore;
    this.eventStore = eventStore;
  }
}
//Export with new RootStore initialization
export default new RootStore();
