import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SubCategory} from "../../Models/SubCategory";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:8085"

  constructor(private http: HttpClient) {
  }
  addSubCategory(SubCategory) {
    return this.http.post<any>(this.baseUrl + `/api/SubCategory/add`, SubCategory);
  }
  updateSubCategory(SubCategory){
    return this.http.put<any>(this.baseUrl + `/api/SubCategory/update`, SubCategory);
  }
  deleteSubCategory(SubCategoryId) {
    return this.http.delete<SubCategory>(this.baseUrl + `/api/SubCategory/delete/${SubCategoryId}`);
  }
  addCategoryToProduct(productId, categoryId) {
    return this.http.get<any>(this.baseUrl + `/api/product/addSubCategoryToProduct/${productId}/${categoryId}`);
  }
  GetProductBySubCategroy(categoryName) {
    return this.http.get<any>(this.baseUrl + `/api/product/get_product_By_Subcategory/${categoryName}`);
  }

  GetAllSubCategories() {
    return this.http.get<any>(this.baseUrl + `/api/SubCategory/all_subcategories`);
  }
  FindSubCategoryById(SubCategoryId: number) {
    return this.http.get<SubCategory>(`${this.baseUrl}/api/SubCategory/get/${SubCategoryId}`);
  }




}
