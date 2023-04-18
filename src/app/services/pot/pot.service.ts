import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PotService {
  baseUrl="http://127.0.0.1:8085"
  constructor(private http:HttpClient) { }
  getpot()
  {
    return this.http.get<any>(this.baseUrl+"/pot/retrieve-all-pots",{
      headers:new HttpHeaders().append('Content-type','appplication/json')
    })
  }
  addpot(data)
  {


    return this.http.post<any>(this.baseUrl+"/pot/add-pot",JSON.stringify(data),{

      headers:new HttpHeaders().append('Content-type','application/json; charset=utf-8')
    })
  }
  deletepot(data)
  {


    return this.http.put<any>(this.baseUrl+"/pot/deletewithstate/"+data,{

      headers:new HttpHeaders().append('Content-type','application/json; charset=utf-8')
    })
  }
  updatept(data)
  {
    return this.http.put<any>(this.baseUrl+"/pot/update-pot",JSON.stringify(data),{

      headers:new HttpHeaders().append('Content-type','application/json; charset=utf-8')
    })
  }

}
