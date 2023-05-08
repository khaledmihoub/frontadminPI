import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../../Models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:8085"

  constructor(private http: HttpClient) {
  }

  addProduct(product: FormData, token) {
    return this.http.post<Product>(this.baseUrl + `/api/product/add/images`, product ,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token})
    });
  }
  updateProduct(product,token){
    return this.http.put<any>(this.baseUrl + `/api/product/update`, product,{
      headers:new HttpHeaders({ authorization : 'Bearer '+token, })
    });
  }
  deleteProduct(productId,token) {
    return this.http.get<any>(this.baseUrl + `/api/product/deleteProductById/${productId}`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
  addCategoryToProduct(productId, categoryId,token) {
    return this.http.get<any>(this.baseUrl + `/api/product/addSubCategoryToProduct/${productId}/${categoryId}`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
  GetProductBySubCategroy(idSubCategory,token) {
    return this.http.get<any>(this.baseUrl + `/api/product/get_product_By_Subcategory/${idSubCategory}`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
  GetProductByFavorite(UserId,token) {
    return this.http.get<any>(this.baseUrl + `/api/product/get_recomandation/${UserId}`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
  GetAllProducts(token) {
    return this.http.get<any>(this.baseUrl + `/api/product/get_all`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
  FindProductById(productId: number,token) {
    return this.http.get<Product>(`${this.baseUrl}/api/product/get/${productId}`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }




}
