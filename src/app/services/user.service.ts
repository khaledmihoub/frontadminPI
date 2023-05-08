import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookiesService } from './cookie/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl="http://127.0.0.1:8085"
  constructor(private http:HttpClient,private ngxCookieService: CookiesService) { }
  getusers(token)
  {


    return this.http.get<any>(this.baseUrl+"/user/retrieve-users",
        {
          headers:new HttpHeaders({ authorization : 'Bearer '+token })
        })
  }
  getroles(token)
  {


    return this.http.get<any>(this.baseUrl+"/role/retrieve-roles",
        {
          headers:new HttpHeaders({ authorization : 'Bearer '+token })
        })
  }

  deleteuser(data, token )
  {


    return this.http.get<any>(this.baseUrl+"/user/deleteuser/"+data, {
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    })
  }
  saveuser(data, token)
  {


    return this.http.post<any>(this.baseUrl+"/user/add-user-admin",JSON.stringify(data),
          {
            headers:new HttpHeaders({
              'authorization' : 'Bearer '+token ,
              'Content-Type': 'application/json',
            }

            )
          }
    )
  }
  updateuser(data, token )
  {
    return this.http.put<any>(this.baseUrl+"/user/update-user",JSON.stringify(data),{
      headers:new HttpHeaders({
        'authorization' : 'Bearer '+token ,
        'Content-Type': 'application/json',
      }

      )
    })
  }

  isLoggedInAdmin() {
    return !!this.ngxCookieService.getCookieJWT()&&this.ngxCookieService.getCookieCostom('role')=== 'admin';
  }
  isLoggedInAss() {
    console.log("isass"+ !!this.ngxCookieService.getCookieJWT()&&this.ngxCookieService.getCookieCostom('role')=== 'association')
    return !!this.ngxCookieService.getCookieJWT()&&this.ngxCookieService.getCookieCostom('role')=== 'association';
  }
}
