import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authservice:UserService,
               private       _router: Router){}
  canActivate() : boolean {
    if (this._authservice.isLoggedInAdmin()){
      return true;
    }else {
      this._router.navigate(['/login'])
      return false;}
  }

}
