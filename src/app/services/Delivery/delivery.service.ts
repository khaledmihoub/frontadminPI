import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  baseUrl="http://localhost:8080"
  constructor(private http:HttpClient) {
  }


  getDeliverers(token) {
    return this.http.get<any>(this.baseUrl + `/user/GetDeliverers`,{
      headers:new HttpHeaders({
        'authorization' : 'Bearer '+token ,
        'Content-Type': 'application/json',
      }

      )
    });
  }

  GetAllDeliveries() {
    return this.http.get<any>(this.baseUrl + `/delivery/GetDeliveries`);
  }

  UpdateDelivery(data, token )
  {
    console.log("data besh tetebaath" + data.id );
    return this.http.put<any>(this.baseUrl+"/delivery/UpdateStatusDelivery/"+data.id,{"adress":data.adress,"status":data.status, "user":data.email},{
      headers:new HttpHeaders({
        'authorization' : 'Bearer '+token ,
        'Content-Type': 'application/json',
      }

      )
    })
  }

  deleteDelivery(idDelivery, token )
  {
    return this.http.delete<any>(this.baseUrl+"/delivery/DeleteDelivery/"+idDelivery, {
      headers:new HttpHeaders({ authorization : 'Bearer '+token })
    })
  }
  // resetemail(data)
  // {
  //   return this.http.post<any>(this.baseUrl+"/forgot_password/"+data,{
  //     headers:new HttpHeaders().append('Content-type','application/json; charset=utf-8')
  //   })
  // }
  // postmotdepasse(token,motdepasse) {
  //   return this.http.post(this.baseUrl+"/change_password/"+token, motdepasse );
  // }

}
