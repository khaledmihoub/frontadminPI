import { Component, OnInit } from '@angular/core';
import { CookiesService } from '../services/cookie/cookies.service';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private us: UserService, private cs:CookiesService ) {
    //get token in constructeur and pass it to APIs
this.jwt=this.cs.getCookieJWT().toString();
this.id=this.cs.getCookieIDUser();
 //console.log(this.jwt);

}
id : number;
jwt : string;
users: any[];
addform = new FormGroup({

  title: new FormControl('', []),
  detail: new FormControl('', []),
  goalAmount: new FormControl('', []),
  expireDate: new FormControl('', []),

})

  ngOnInit(): void {
    this.us.getusers(this.jwt).subscribe(res=>{
      console.log(res);
      this.users=res;
    })
  }
  adduser(){

  }
  delete(idp){
    this.us.deleteuser(idp,this.jwt).subscribe(res=>{
      console.log(res);
      window.location.reload();
  })
  }
}
