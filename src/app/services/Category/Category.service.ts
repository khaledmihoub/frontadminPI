import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Category} from "../../Models/Category";
import {Product} from "../../Models/Product";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = "http://localhost:8085"

  constructor(private http: HttpClient) {
  }
  addCategory(Category,token) {
    return this.http.post<any>(this.baseUrl + `/api/Category/add`, Category, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
  updateCategory(Category,token){
    return this.http.put<any>(this.baseUrl + `/api/Category/update`, Category, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
  deleteCategory(CategoryId,token) {
    return this.http.delete<Category>(this.baseUrl + `/api/Category/delete/${CategoryId}`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
  GetAllCategories(token) {
    return this.http.get<any>(this.baseUrl + `/api/Category/all_categories`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
  FindCategoryBySubId(idSubCategory: number,token) {
    return this.http.get<Category>(`${this.baseUrl}/api/Category/findBySubId/${idSubCategory}`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }



}
