export interface ProductsQuery {
  brand?: string | null | undefined;
  product_category?: string;
  product_type?: string;

  pageIndex?: string;
  pageSize?: string;
  id?: number;

}
