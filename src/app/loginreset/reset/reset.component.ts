import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {LoginService}  from '../../services/login/login.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  show = false;
  showsp = false;
  isLoading: boolean = false;
  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  get email() {
    return this.resetForm.get('email');
  }

  constructor(private LS: LoginService,) { }

  ngOnInit(): void {

  }
  reset(){
    console.log(this.email.value);
    this.show= true;
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 10000);
    this.LS.resetemail(this.email.value).subscribe(res=>{
      this.showsp = true;
      this.isLoading = false;
      //

        if (res==true){
          console.log("true");
          //gestion
        }else {
          console.log("false");
          //gestion
        }

    })
  }
}
