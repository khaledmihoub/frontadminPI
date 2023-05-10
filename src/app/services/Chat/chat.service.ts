import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl="http://localhost:8080"
  constructor(private http:HttpClient) {
  }


  getAllPublicChats(token) {
    return this.http.get<any>(this.baseUrl + `/getPublicChatsAdmin`,{
      headers:new HttpHeaders({
        'authorization' : 'Bearer '+token ,
        'Content-Type': 'application/json',
      }

      )
    });
  }

  getAllPrivateChats(token) {
    return this.http.get<any>(this.baseUrl + `/getPrivateChatsAdmin`,{
      headers:new HttpHeaders({
        'authorization' : 'Bearer '+token ,
        'Content-Type': 'application/json',
      }

      )
    });
  }

  

}
