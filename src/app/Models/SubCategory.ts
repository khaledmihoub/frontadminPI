import {Product} from "./Product";
import {Category} from "./Category";

export class SubCategory {
  idSubCategory: number;
  name: string;
  category: Category;
  products: Product[];
  favoriteList : any;
}
