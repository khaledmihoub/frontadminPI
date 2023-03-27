import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl="http://127.0.0.1:3000"
  constructor(private http:HttpClient) {
  }

  login(data)
  {

    return this.http.post<any>(this.baseUrl+"/user/login",JSON.stringify(data),{

      headers:new HttpHeaders().append('Content-type','application/json; charset=utf-8')
    })
  }
}
