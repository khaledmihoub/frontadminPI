import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  baseUrl="http://127.0.0.1:8085"
  constructor(private http:HttpClient) { }
  getclaim(token)
  {
    return this.http.get<any>(this.baseUrl+"/claim/retrieve-all-claims", {
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    })
  }
  updateClaim(data,token)
  {
      return this.http.put<any>(this.baseUrl+"/claim/update-claim",JSON.stringify(data),{
        headers:new HttpHeaders({
          'authorization' : 'Bearer '+token ,
          'Content-Type': 'application/json',
        }

        )
      })
    }
  sendmail(email,message,token){

    return this.http.post<any>(this.baseUrl+"/claim/sendmail/"+email,message, {
      headers:new HttpHeaders({
        'authorization' : 'Bearer '+token ,
        'Content-Type': 'application/json',
      }

      )
    })


  }
}
