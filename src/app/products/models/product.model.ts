export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: string;
  category: string;
  public qty: number;

  constructor(options: any = {}) {
    this.id = options.id
    this.name = options.name
    this.description = options.description
    this.price = +options.price || 7;
    this.imageUrl = options.image_link;
    this.brand = options.brand;
    this.category = options.category;
    this.qty = options.qty
  }
}
