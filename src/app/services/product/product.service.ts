import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../../Models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:8085"

  constructor(private http: HttpClient) {
  }
  addProduct(product) {
    return this.http.post<any>(this.baseUrl + `/api/product/add`, product);
  }
  updateProduct(product){
    return this.http.put<any>(this.baseUrl + `/api/product/update`, product);
  }
  deleteProduct(productId) {
    return this.http.delete<Product>(this.baseUrl + `/api/product/deleteProductById/${productId}`);
  }
  addCategoryToProduct(productId, categoryId) {
    return this.http.get<any>(this.baseUrl + `/api/product/addSubCategoryToProduct/${productId}/${categoryId}`);
  }
  GetProductBySubCategroy(categoryName) {
    return this.http.get<any>(this.baseUrl + `/api/product/get_product_By_Subcategory/${categoryName}`);
  }
  GetProductByFavorite(UserId) {
    return this.http.get<any>(this.baseUrl + `/api/product/get_recomandation/${UserId}`);
  }
  GetAllProducts() {
    return this.http.get<any>(this.baseUrl + `/api/product/get_all`);
  }
  FindProductById(productId: number) {
    return this.http.get<Product>(`${this.baseUrl}/api/product/get/${productId}`);
  }




}
