import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../Models/post';



@Injectable({
  providedIn: 'root'
})
export class PostService {

  token = new HttpHeaders()
.set('Content-Type', 'application/json; charset=utf-8')
.set('Accept', 'application/json')
.set('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlzcyI6InNwcmluZyBiYWNrZW5kIiwiaWQiOjEsImV4cCI6MTY4MzU3NDg3OCwiaWF0IjoxNjgzNTQ2MDc4fQ.iWNIdmAq1phAj7S8xLz28LcE5Lkq86Vu101DnLLCmcfJxZAIFZDzjlYU-ZhIQBqTlAkB-1fmURw-EG7y096wgg')
 
  private baseURL = "http://localhost:8085/post";

  constructor(private httpClient: HttpClient) { }

  getPostsList(): Observable<Post[]>{
    
    return this.httpClient.get<Post[]>(`${this.baseURL}/retrieve-all-posts`);
  }

  createEvent(event: Event): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, event , {headers:this.token});
  }

  getEventById(id: number): Observable<Event>{
    return this.httpClient.get<Event>(`${this.baseURL}/${id}`, {headers:this.token});
  }

  updateEvent(id: number, event: Event): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, event, {headers:this.token});
  }

  deletePost(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/remove-post/${id}`, {headers:this.token});
    
  }
}
