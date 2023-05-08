import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SubCategory} from "../../Models/SubCategory";
import {Product} from "../../Models/Product";

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  baseUrl = "http://localhost:8085"

  constructor(private http: HttpClient) {
  }
  addSubCategory(SubCategory,token) {
    return this.http.post<any>(this.baseUrl + `/api/SubCategory/add`, SubCategory, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
  updateSubCategory(subCategoryId: number, newSubCategoryName: string, token: string) {
    return this.http.put<any>(this.baseUrl + `/api/SubCategory/update/${subCategoryId}`, newSubCategoryName , {
      headers: new HttpHeaders({ authorization: 'Bearer ' + token })
    });
  }
  deleteSubCategory(SubCategoryId,token) {
    return this.http.delete<SubCategory>(this.baseUrl + `/api/SubCategory/delete/${SubCategoryId}`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
  getProductCountBySubCategory(){
    return this.http.get<any>(`${this.baseUrl}+/api/SubCategory/productcount`);
  }


  addCategoryToProduct(productId, categoryId,token) {
    return this.http.get<any>(this.baseUrl + `/api/product/addSubCategoryToProduct/${productId}/${categoryId}`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
  GetProductBySubCategroy(categoryName,token) {
    return this.http.get<any>(this.baseUrl + `/api/product/get_product_By_Subcategory/${categoryName}`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }

  GetAllSubCategories(token) {
    return this.http.get<any>(this.baseUrl + `/api/SubCategory/all_subcategories`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
  FindSubCategoryById(SubCategoryId: number,token) {
    return this.http.get<SubCategory>(`${this.baseUrl}/api/SubCategory/get/${SubCategoryId}`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }




}
