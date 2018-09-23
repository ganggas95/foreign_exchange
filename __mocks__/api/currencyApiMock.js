import { basename, join } from "path";
import { readFile } from "fs";

export default class CurrencyAPI {
  GetCurrencies = (base = "USD") => {
    return new Promise((resolve, reject) => {
      readFile(join(__dirname, `${base}.json`), (err, data) => {
        if (err) reject();
        resolve(JSON.parse(data));
      });
    });
  };
}
