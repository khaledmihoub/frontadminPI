import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  baseUrl = "http://localhost:8085/api/Commande"

  constructor(private http: HttpClient) {
  }

  getAllCommande(token) {
    return this.http.get<any>(this.baseUrl + `/all_commandes`, {
      headers: new HttpHeaders({authorization: 'Bearer ' + token})
    });
  }
}
