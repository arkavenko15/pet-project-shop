import { HttpParams } from '@angular/common/http';

export interface ProductsQuery {
  brand?: string | null | undefined;
  product_category?: string;
  product_type?:string;
<<<<<<< HEAD
  pageIndex?: string;
  pageSize?: string;
=======
  id?:number;
>>>>>>> branch-08.11
}
