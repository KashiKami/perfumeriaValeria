import { State } from "./state";
import { Client } from "./client";
import { Product } from "./product";

export class Order {
  id: number;
  date: string;
  state: State;
  client: Client;
  products: Array<Product>;
  value: number;
  email: string;
  name: string;
  

  getValue():number {
    let auxValue: number = 0;
    for (let i = 0; i < this.products.length; i++) {
      let auxProduct = this.products[i];
      auxValue += (auxProduct.priceOut - ((auxProduct.priceOut * auxProduct.amount) / 100)) * auxProduct.amount;
    }
    return auxValue;
  }
}
