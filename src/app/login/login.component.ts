
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
    var token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5YXNzaW5lIiwiaWF0IjoxNjgzNjUxOTM2LCJleHAiOjE2ODM3MzgzMzZ9.TDNXDkg5CC4vGIsGhmgeOzQD610fuANogZRtdhnF_SqAGHg2swIWA_S6zuGXuU6M9eHVgNMNcrvawZG7sYQtKQ";
    var decoded = jwt_decode(token);
      this.CS.deleteAllCookies();
    console.log(decoded);
  }

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required,Validators.minLength(4)]),
    password: new FormControl('', [Validators.required,Validators.minLength(8)])
  })

  login() {

                  this.CS.setCookieToken("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5YXNzaW5lIiwiaWF0IjoxNjgzNjUxOTM2LCJleHAiOjE2ODM3MzgzMzZ9.TDNXDkg5CC4vGIsGhmgeOzQD610fuANogZRtdhnF_SqAGHg2swIWA_S6zuGXuU6M9eHVgNMNcrvawZG7sYQtKQ");
                  var decoded = jwt_decode("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5YXNzaW5lIiwiaWF0IjoxNjgzNjUxOTM2LCJleHAiOjE2ODM3MzgzMzZ9.TDNXDkg5CC4vGIsGhmgeOzQD610fuANogZRtdhnF_SqAGHg2swIWA_S6zuGXuU6M9eHVgNMNcrvawZG7sYQtKQ") as any ;

                  this.CS.setCookieId(decoded.id);
                  //if (decoded.role == "admin"){
                      console.log(decoded.role);
                      this._router.navigate(['/dashboard']);
                  //redirection dashbord
                 // }else {
                      console.log("not admin");
                  //redirection interface user
                  //}
    
 /*   console.warn(this.loginForm.value);
     let logindata=JSON.stringify(this.loginForm.value);
      this.ls.login(this.loginForm.value).subscribe(res=>{
          console.warn(res) ;

          this.CS.setCookieToken(res.jwt);
          var decoded = jwt_decode(res.jwt) as any ;

          this.CS.setCookieId(decoded.id);
          if (decoded.role == "admin"){
                console.log(decoded.role);
                this._router.navigate(['/dashboard']);
                //redirection dashbord
          }else {
               console.log("not admin");
                //redirection interface user
          }
     },
    error => {
   console.log(error.error);
 // login failed, show error message
      }*/

//         )

  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }





}
