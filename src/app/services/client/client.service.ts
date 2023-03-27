import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl="http://localhost:3000"
  constructor(private http:HttpClient) { }


  ajouterClient(data)
  {
    return this.http.post<any>(this.baseUrl+"/client/ajouterclient",data,{
      headers:new HttpHeaders().append('Content-type','appplication/json')
    })
  }
}
