import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../entities/evenement';
import { Review } from '../entities/review';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  token = new HttpHeaders()
  .set('Content-Type', 'application/json; charset=utf-8')
  .set('Accept', 'application/json')
  .set('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlzcyI6InNwcmluZyBiYWNrZW5kIiwiaWQiOjEsImV4cCI6MTY4MzY3MTEwMywiaWF0IjoxNjgzNjQyMzAzfQ.GrLNvMv3Tq4A5T_BuhkzMPJQbeNQrNjufXAuhcuKwZvvSw5qZ6HJGWooP9eYRnbJC2KXrvJ1ol7ZgTxHtSc0-Q')
   

  tokenn = new HttpHeaders()
  .set('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlzcyI6InNwcmluZyBiYWNrZW5kIiwiaWQiOjEsImV4cCI6MTY4MzY3MTEwMywiaWF0IjoxNjgzNjQyMzAzfQ.GrLNvMv3Tq4A5T_BuhkzMPJQbeNQrNjufXAuhcuKwZvvSw5qZ6HJGWooP9eYRnbJC2KXrvJ1ol7ZgTxHtSc0-Q')
    private baseURL = "http://localhost:8085/event";
  
    constructor(private httpClient: HttpClient) { }
  
    getEvenementsList(): Observable<Evenement[]>{
      
      return this.httpClient.get<Evenement[]>(`${this.baseURL}/retrieve-all-events`, {headers:this.token});
    }
  
    createEvenement(evenement: any ): Observable<Object>{
      return this.httpClient.post(`${this.baseURL}/add-event`, evenement , {headers:this.token} );
    }

    createEvenementImage(evenement: any ): Observable<Object>{
      return this.httpClient.post(`${this.baseURL}/add/image`, evenement , {headers:this.tokenn} );
    }


    
  
    getEvenementById(id: number): Observable<Evenement>{
      return this.httpClient.get<Evenement>(`${this.baseURL}/retrieve-event/${id}`, {headers:this.token});
    }
  
    updateEvenement( evenement: Evenement): Observable<Object>{
      return this.httpClient.put(`${this.baseURL}/update-event`, evenement, {headers:this.token});
    }
  
    deleteEvenement(id: number): Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/remove-event/${id}`, {headers:this.token});
    }

    getReviewByEvent(id: number): Observable<Review[]>{
      return this.httpClient.get<Review[]>(`http://localhost:8085/review/retrieve-reviews/${id}`, {headers:this.token});
    }
}
