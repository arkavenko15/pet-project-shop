import { Color } from './color.model';
export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  brand: string;
  category: string;
  public qty: number;
  created_at:string;
  price_sign:string;
  product_colors: Color[];
  product_color:string;
  isLiked: boolean;
  constructor(options: any = {}) {
    this.id = options.id
    this.name = options.name
    this.description = options.description
    this.price = +options.price || 7;
    this.imageUrl = options.image_link;
    this.brand = options.brand;
    this.category = options.category;
    this.qty = options.qty;
    this.created_at = options.created_at;
    this.price_sign = options.price_sign;
    this.product_colors = options.product_colors;
    this.product_color = options.product_color;
    this.isLiked = options.isLiked;
  }
}
