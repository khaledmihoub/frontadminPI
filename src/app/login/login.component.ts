
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { zip } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import {LoginService}  from '../services/login/login.service';
import { DossierService } from '../services/dossier/dossier.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor( private _router: Router ,private ls :LoginService, private ds:DossierService) { }
  ngOnInit(): void {


  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required,Validators.minLength(3)])
  })

  login() {
    //console.warn(this.loginForm.value);

      let logindata=JSON.stringify(this.loginForm.value);

      console.log(logindata);

      this.ls.login(this.loginForm.value).subscribe(res=>{
          console.log(res);
      })

  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }





}
