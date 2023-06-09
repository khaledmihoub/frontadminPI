import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../Models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  token = new HttpHeaders()
  .set('Content-Type', 'application/json; charset=utf-8')
  .set('Accept', 'application/json')
  .set('Authorization','Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlzcyI6InNwcmluZyBiYWNrZW5kIiwiaWQiOjEsImV4cCI6MTY4MzU3NDg3OCwiaWF0IjoxNjgzNTQ2MDc4fQ.iWNIdmAq1phAj7S8xLz28LcE5Lkq86Vu101DnLLCmcfJxZAIFZDzjlYU-ZhIQBqTlAkB-1fmURw-EG7y096wgg')
   
    private baseURL = "http://localhost:8085/comment";
  
    constructor(private httpClient: HttpClient) { }
  
    
   
    createComment(comment:Comment, id:number): Observable<Object>{
      return this.httpClient.post(`${this.baseURL}/add-comment/${id}`,comment, {headers:this.token});
    }
  
    getCommentsByPost(id: number): Observable<Comment[]>{
      return this.httpClient.get<Comment[]>(`${this.baseURL}/retrieve-comments-by-post/${id}`, {headers:this.token});
    }
  
    updateEvent(id: number, event: Event): Observable<Object>{
      return this.httpClient.put(`${this.baseURL}/${id}`, event, {headers:this.token});
    }
  
    deleteEvent(id: number): Observable<Object>{
      return this.httpClient.delete(`${this.baseURL}/${id}`, {headers:this.token});
    }
}
