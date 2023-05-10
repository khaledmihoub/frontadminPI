import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../entities/evenement';
import { Review } from '../entities/review';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  token2="";
  token = new HttpHeaders()
  .set('Content-Type', 'application/json; charset=utf-8')
  .set('Accept', 'application/json')
  .set('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlzcyI6InNwcmluZyBiYWNrZW5kIiwiaWQiOjEsImV4cCI6MTY4MzcwMTQ1MywiaWF0IjoxNjgzNjcyNjUzfQ.m1V91pYi8kWdck7qeAPlEOQRpdVF0RbFy_JF11QsZli_G8q0i_Zm9w5NOMlII64o-P0fCoacEh75CgF8XcCVpA')
   

  tokenn = new HttpHeaders()
  .set('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlzcyI6InNwcmluZyBiYWNrZW5kIiwiaWQiOjEsImV4cCI6MTY4MzcwMTQ1MywiaWF0IjoxNjgzNjcyNjUzfQ.m1V91pYi8kWdck7qeAPlEOQRpdVF0RbFy_JF11QsZli_G8q0i_Zm9w5NOMlII64o-P0fCoacEh75CgF8XcCVpA')
    private baseURL = "http://localhost:8085/event";
  
    constructor(private httpClient: HttpClient) { }
    auth(token:string){
      this.token2='Bearer '+token;
      console.log(this.token2);

    }
  
    getEvenementsList(): Observable<Evenement[]>{
      
      return this.httpClient.get<Evenement[]>(`${this.baseURL}/retrieve-all-events`,{
        headers:new HttpHeaders({ authorization : this.token2})
      });
    }
  
    createEvenement(evenement: any ): Observable<Object>{
      return this.httpClient.post(`${this.baseURL}/add-event`, evenement , {
        headers:new HttpHeaders({ authorization : this.token2})
      });
    }
    createEvenementImage(evenement: any ): Observable<Object>{
      return this.httpClient.post(`${this.baseURL}/add/image`, evenement , {
        headers:new HttpHeaders({ authorization : this.token2})
      });
    }

    
  
    getEvenementById(id: number): Observable<Evenement>{
      return this.httpClient.get<Evenement>(`${this.baseURL}/retrieve-event/${id}`, {
        headers:new HttpHeaders({ authorization : this.token2})
      });
    }
  
    updateEvenement( evenement: Evenement): Observable<Object>{
      return this.httpClient.put(`${this.baseURL}/update-event`, evenement, {
        headers:new HttpHeaders({ authorization : this.token2})
      });
    }
  
    deleteEvenement(id: number): Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/remove-event/${id}`, {
        headers:new HttpHeaders({ authorization : this.token2})
      });
    }

    getReviewByEvent(id: number): Observable<Review[]>{
      return this.httpClient.get<Review[]>(`http://localhost:8085/review/retrieve-reviews/${id}`, {
        headers:new HttpHeaders({ authorization : this.token2})
      });
    }
  }
