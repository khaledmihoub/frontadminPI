import {Image} from "./Image";
import {SubCategory} from "./SubCategory";
import {User} from "./User";
export class Product{
  idProduct!: number;
  createDateTime!: Date;
  description!: string;
  quantity!: number;
  reference!: string;
  status!: boolean;
  title!: string;
  subCategory: SubCategory;
  user: User;
  ProductImages: Image[];

}
