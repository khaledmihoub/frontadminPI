import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DossierService {
  baseUrl="http://127.0.0.1:3000"
  constructor(private http:HttpClient) {
  }
  getdossier()
  {
    return this.http.get<any>(this.baseUrl+"/dossier/afficher",{
      headers:new HttpHeaders().append('Content-type','appplication/json')
    })
  }
  ajout(data)
  {


    return this.http.post<any>(this.baseUrl+"/dossier/ajouter",JSON.stringify(data),{

      headers:new HttpHeaders().append('Content-type','application/json; charset=utf-8')
    })
  }

}
