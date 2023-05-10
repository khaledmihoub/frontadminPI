import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {LoginService}  from '../../services/login/login.service';
import { MustMatch } from '../../helpers/must-Match.validator';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  passwordchange: FormGroup;
  showsp = false;

  changeInput() {

  }
  changeInput2() {
    this.type_input2 = !this.type_input2;
    this.type_input = !this.type_input;
  }
  type_input: any;
  type_input2: any;
  constructor(private formBuilder: FormBuilder,private LS: LoginService,private activatedRoute: ActivatedRoute,private router: Router) { }
  token: any;
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token); // Print the parameter to the console.
    });

    this.passwordchange = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(8)]],
      passwordConfirmer: ['', [Validators.required,Validators.minLength(8)]],
    }, {
      validator: MustMatch('password', 'passwordConfirmer')
    });



  }

  get password() {
    return this.passwordchange.get('password');
  }
  get conpassword() {
    return this.passwordchange.get('passwordConfirmer');
  }


  reset(){
    //form and test
    console.log(this.passwordchange.value.password);
    this.LS.postmotdepasse(this.token,this.passwordchange.value.password).subscribe(res=>{
        if (res==true){
          this.showsp=true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 4000);
          console.log("true");
          //gestion
        }else {
          console.log("false");
          //gestion
        }

    })
  }


}
