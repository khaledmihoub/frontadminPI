
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
err=false;
message="";
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.minLength(4)]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)])
  })

  login() {
    //console.warn(this.loginForm.value);
    //  let logindata=JSON.stringify(this.loginForm.value);
    let statue=0;
      this.ls.login(this.loginForm.value).subscribe(res=>{
          console.warn(res) ;
          this.CS.setCookieToken(res.jwt);
          var decoded = jwt_decode(res.jwt) as any ;
          this.CS.setCookieId(decoded.id);
          this.CS.setCookieCostom("role",decoded.role);
          this.ls.getoneuser(res.jwt,decoded.id).subscribe(res=>{
                  let statue= res.status;
                  console.log(statue+"aaaaaaaaaa");

          console.log(statue+"aaaaaaaaaa");
          if (decoded.role == "admin" && (statue == 1 ||statue == 3) ){
                console.log(decoded.role);
                this._router.navigate(['/dashboard']);
                //redirection dashbord
          }else if ( statue==0) {
            this.err=true;
            this.message="Sorry Your account is blocked "
             //
                //redirection interface user
          } else if (decoded.role == "association" && statue==1){
                    this._router.navigate(['/ass/user']);

          }
        })
     },
    error => {
this.err=true;
this.message="Sorry your login or passord is incorrect"
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
