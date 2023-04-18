import { Component, OnInit, ViewChild } from '@angular/core';
import { PotService } from '../services/pot/pot.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pot',
  templateUrl: './pot.component.html',
  styleUrls: ['./pot.component.scss']
})
export class PotComponent implements OnInit {
  @ViewChild('myupdateModal') myupdateModal: ModalDirective;
  constructor(private potService: PotService) { }
  pots: any[];
  today: string;
  currentpot:any;
  ngOnInit(): void {
    this.potService.getpot().subscribe(res=>{
      this.pots=res.reverse();
      const date = new Date();
    this.today = date.toISOString().substring(0, 10);
   });
  }
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
updatepot(pot) {
pot.title=this.updateform.get('title').value;
pot.detail=this.updateform.get('detail').value;
pot.goalAmount=this.updateform.get('goalAmount').value;
pot.expireDate=this.updateform.get('expireDate').value;
this.potService.updatept(pot).subscribe(data =>
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
      data.user = { idUser: 1 };
      console.log(data);

      this.potService.addpot(data).subscribe(res=>{

          console.log(res);
          window.location.reload();

      })
  }

  delete(idp){
    this.potService.deletepot(idp).subscribe(res=>{

      console.log(res);
      window.location.reload();

  })
  }


}
