import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl="http://127.0.0.1:8085"
  constructor(private http:HttpClient) { }
  getusers(token)
  {


    return this.http.get<any>(this.baseUrl+"/user/retrieve-users",
        {
          headers:new HttpHeaders({ authorization : 'Bearer '+token })
        })
  }

  deleteuser(data, token )
  {


    return this.http.get<any>(this.baseUrl+"/user/deleteuser/"+data, {
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    })
  }


}
