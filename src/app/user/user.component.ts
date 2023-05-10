import { Component, OnInit, ViewChild } from '@angular/core';
import { CookiesService } from '../services/cookie/cookies.service';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('updateModal') updateModal: ModalDirective;
  @ViewChild('myModal') myModal: ModalDirective;

  constructor(private us: UserService, private cs:CookiesService ) {
    //get token in constructeur and pass it to APIs
this.jwt=this.cs.getCookieJWT().toString();
this.id=this.cs.getCookieIDUser();
 //console.log(this.jwt);

}
id : number;
jwt : string;
users: any[];
roles: any[];
searchTerm: string = '';
currentuser: any;
err=false;
addform = new FormGroup({
  name: new FormControl('', [Validators.required,Validators.minLength(3)]),
  lastname: new FormControl('', [Validators.required,Validators.minLength(3)]),
  email: new FormControl('', [Validators.required,Validators.email]),
  login: new FormControl('', [Validators.required,Validators.minLength(4)]),
  userRole: new FormControl('', [Validators.required]),
})
updateform = new FormGroup({
  name: new FormControl('', [Validators.required,Validators.minLength(3)]),
  lastname: new FormControl('', [Validators.required,Validators.minLength(3)]),
  email: new FormControl('', [Validators.required,Validators.email]),
  login: new FormControl('', [Validators.required,Validators.minLength(4)]),
  password: new FormControl('', [Validators.required,Validators.minLength(8)]),
  userRole: new FormControl('', [Validators.required]),
})
openModal(user: any) {
  this.updateModal.show();

 // console.log(user);

  this.currentuser=user;
  this.updateform.patchValue({
    name: user.name,
    lastname: user.lastname,
    login:  user.login,
    email: user.email,
    password: user.password,
    userRole: user.userRole.idRole,
  })

}
updateuser(user) {
 console.error(this.updateform.value);
 user.name=this.updateform.get('name').value;
  user.lastname=this.updateform.get('lastname').value;
  user.login=this.updateform.get('login').value;
 user.email=this.updateform.get('email').value;
 user.password=this.updateform.get('password').value;
 user.userRole.idRole=this.updateform.get('userRole').value;
this.us.updateuser(user,this.jwt).subscribe(data =>
   {
    // console.log(data);
     window.location.reload();
   })
}
  ngOnInit(): void {
    this.us.getusers(this.jwt).subscribe(res=>{
    //  console.log(res);
      this.users=res.reverse();
    })
    this.us.getroles(this.jwt).subscribe(res=>{
     // console.log(res);
      this.roles=res;
    })
  }
  adduser(){
   // console.warn(this.addform.value);
    let data=(this.addform.value);
    data.userRole = {idRole: data.userRole};
    //console.warn(data);
    this.us.saveuser(data,this.jwt).subscribe(res=>{
     // console.log(res);
      window.location.reload();
  },error=>{
    this.myModal.hide();
    this.err=true;
  }



  )}
  filteredUser():any[] {
    if (!this.searchTerm) {
      return this.users;
    }
    return this.users.filter((u) =>
      u.login.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      u.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||

      u.userRole.role.toLowerCase().includes(this.searchTerm.toLowerCase()) ||

      u.login.toLowerCase().includes(this.searchTerm.toLowerCase())

    );
  }
  delete(idp){
    this.us.deleteuser(idp,this.jwt).subscribe(res=>{
    //  console.log(res);
      window.location.reload();
  })
  }
}
