import lodash from "lodash";
export default function searchCurrencies(
  keyword,
  source = [],
  filteredCurrencies = []
) {
  // Search data with regex and lodash.js
  const re = new RegExp(lodash.escapeRegExp(keyword), "i");

  // Function to Check searching result
  const isMatch = result => {
    // If check search returning true and currency not exist in selectedCurrencies in currencyStore
    // Return Result
    return (
      re.test(result.title) &&
      typeof filteredCurrencies.find(data => data.key === result.key) ===
        "undefined"
    );
  };
  return lodash.filter(source, isMatch);
}
