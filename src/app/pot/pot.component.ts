import { Component, OnInit, ViewChild } from '@angular/core';
import { PotService } from '../services/pot/pot.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookiesService } from '../services/cookie/cookies.service';

@Component({
  selector: 'app-pot',
  templateUrl: './pot.component.html',
  styleUrls: ['./pot.component.scss']
})
export class PotComponent implements OnInit {
  @ViewChild('myupdateModal') myupdateModal: ModalDirective;


  constructor(private potService: PotService, private cs:CookiesService ) {
        //get token in constructeur and pass it to APIs
    this.jwt=this.cs.getCookieJWT().toString();
    this.id=this.cs.getCookieIDUser();
     //console.log(this.jwt);

   }

  jwt : string;
  pots: any[];
  today: string;
  currentpot:any;
  id:number;

  addform = new FormGroup({
    title: new FormControl('', []),
    detail: new FormControl('', []),
    goalAmount: new FormControl('', []),
    expireDate: new FormControl('', []),

})
updateform = new FormGroup({
  title: new FormControl('', []),
  detail: new FormControl('', []),
  goalAmount: new FormControl('', []),
  expireDate: new FormControl('', []),

})


  ngOnInit(): void {
    //console.log(this.jwt);
    this.potService.getpot(this.jwt).subscribe(res=>{
        this.pots=res.reverse();
          console.log(this.pots);
        const date = new Date();
      this.today = date.toISOString().substring(0, 10);
   });
  }

updatepot(pot) {
    pot.title=this.updateform.get('title').value;
    pot.detail=this.updateform.get('detail').value;
    pot.goalAmount=this.updateform.get('goalAmount').value;
    pot.expireDate=this.updateform.get('expireDate').value;
    this.potService.updatept(pot,this.jwt).subscribe(data =>
      {
        console.log(data);
        window.location.reload();
      })
}
openModal(pot: any) {
  this.myupdateModal.show();
  console.log(pot);
  this.currentpot=pot;
  this.updateform.patchValue({
    title: pot.title,
    detail: pot.detail,
    goalAmount: pot.goalAmount,
    expireDate: new Date(pot.expireDate).toISOString().substring(0, 10),
  })

}
  addpot() {
      let data=(this.addform.value);
      data.user = { idUser: this.id };
      console.log(data);

      this.potService.addpot(data,this.jwt).subscribe(res=>{
          console.log(res);
          window.location.reload();

      })
  }

  delete(idp){
    this.potService.deletepot(idp,this.jwt).subscribe(res=>{

      console.log(res);
      window.location.reload();

  })
  }


}
