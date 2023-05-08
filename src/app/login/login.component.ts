
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { zip } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import {LoginService}  from '../services/login/login.service';
import { DossierService } from '../services/dossier/dossier.service';
import jwt_decode from 'jwt-decode';
import {CookiesService}  from '../services/cookie/cookies.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor( private _router: Router ,private ls :LoginService, private ds:DossierService,private CS: CookiesService) { }
  ngOnInit(): void {
      this.CS.deleteAllCookies();
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.minLength(4)]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)])
  })

  login() {
    //console.warn(this.loginForm.value);
    //  let logindata=JSON.stringify(this.loginForm.value);
      this.ls.login(this.loginForm.value).subscribe(res=>{
          console.warn(res) ;
          this.CS.setCookieToken(res.jwt);
          var decoded = jwt_decode(res.jwt) as any ;
          this.CS.setCookieId(decoded.id);
          this.CS.setCookieCostom("role",decoded.role);

          if (decoded.role == "admin"){
                console.log(decoded.role);
                this._router.navigate(['/dashboard']);
                //redirection dashbord
          }else {
               console.log("not admin");
               this._router.navigate(['/ass/user']);
                //redirection interface user
          }
     },
    error => {
   console.log(error.error);
 // login failed, show error message
      }

        )

  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }





}
