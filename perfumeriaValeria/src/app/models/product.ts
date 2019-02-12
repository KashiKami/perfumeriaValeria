export class Product {
  codeBar: number;
  name: string;
  description: string;
  priceIn: number;
  priceOut: number;
  discount: number;
  photo: string;
  video: string;
  email: string;
  amount: number;
  constructor(product: any) {
    this.photo = product.photo;
    this.video = product.video;
  }
 }
