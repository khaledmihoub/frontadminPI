import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FichierService {
  baseUrl="http://127.0.0.1:3000"
  constructor(private http:HttpClient) {
  }
  postfichier(file)
  {

   const formData = new FormData();
   // Store form name as "file" with file data
   formData.append("image", file, file.name);
    return this.http.post<any>(this.baseUrl+"/document/ajouter",formData  )
  }
}
