
export class ProductProvider {
  provider:string;
  date: string;
  product: string;
  price:string;
  amount:string;
  total:string;
  totalOrder:string;
  constructor(provider: string,
    date: string,
    product: string,
    price:string,
    amount: string,
    total:string,
    totalOrder:string) {
    
    this.provider = provider;
    this.date = date;
    this.product = product;
    this.total=total;
    this.price=price;
    this.amount=amount;
    totalOrder=totalOrder;
  }
}