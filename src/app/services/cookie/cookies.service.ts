import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private ngxCookieService: CookieService) {
}


public setCookieToken(value: string): void {
  this.ngxCookieService.set("jwt", value);
}
public setCookieId(value: string): void {
  this.ngxCookieService.set("idUser", value);
}

public getCookieJWT(): string {
  return this.ngxCookieService.get("jwt");
}
public getCookieIDUser(): number {
  return Number(this.ngxCookieService.get("idUser"));
}

public setCookieCostom(name:string , value: string): void {
  this.ngxCookieService.set(name, value);
}

public getCookieCostom(name:string ): string {
  return this.ngxCookieService.get(name);
}

deleteAllCookies(): void {
  this.ngxCookieService.deleteAll();
}



}
