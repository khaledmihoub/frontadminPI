import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AssAuthGuardService implements CanActivate{

  constructor(private _authservice:UserService,
    private       _router: Router){}
canActivate() : boolean {
if (this._authservice.isLoggedInAss()){
return true;
}else {
this._router.navigate(['/login'])
return false;}
}
}
