export default function(number, symbol = "") {
  /**
   * Function to Format Price and marge formatted price with symbol
   * @param {string} number
   * @param {string} symbol
   */
  if (typeof number == "string" && number.length > 0) {
    return `${symbol} ${number.replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  }
}
