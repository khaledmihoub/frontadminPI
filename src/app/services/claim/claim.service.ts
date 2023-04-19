import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  baseUrl="http://127.0.0.1:8085"
  constructor(private http:HttpClient) { }
  getclaim()
  {
    return this.http.get<any>(this.baseUrl+"/claim/retrieve-all-claims",{
      headers:new HttpHeaders().append('Content-type','appplication/json')
    })
  }
  updateClaim(data)
  {
    return this.http.put<any>(this.baseUrl+"/claim/update-claim",JSON.stringify(data),{

      headers:new HttpHeaders().append('Content-type','application/json; charset=utf-8')
    })
  }
  sendmail(email,message){

    return this.http.post<any>(this.baseUrl+"/claim/sendmail/"+email,message)
  }
}
