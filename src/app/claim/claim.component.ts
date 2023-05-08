import { Component, OnInit , ViewChild  } from '@angular/core';
import { ClaimService } from '../services/claim/claim.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { CookiesService } from '../services/cookie/cookies.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.scss']
})
export class ClaimComponent implements OnInit {
  editMode: boolean = false;
  searchTerm: string = '';
  jwt:String;
  claims:any[];
  newStatus: string = 'Pending';

  @ViewChild('myModal') myModal: ModalDirective;
  @ViewChild('mychatModal') mychatModal: ModalDirective;
  currentClaim: any;
  constructor(private claimService:ClaimService, private cs:CookiesService) {
    this.jwt=this.cs.getCookieJWT().toString();
   }


  ngOnInit(): void {
    this.claimService.getclaim(this.jwt).subscribe(data=>{
      this.claims=data.reverse();
     console.log(data);
     console.log(this.currentClaim);
    })
  }
  sendmail = new FormGroup({
    email: new FormControl('', []),
    message: new FormControl('', [])

})
  onStatusSave(event, claim) {
  event.preventDefault();
  claim.status = claim.newStatus;
  this.claimService.updateClaim(claim,this.jwt).subscribe(updatedClaim => {
    this.editMode = false;
  });
}
  onCancel() {
    this.editMode = false;
  }
  openModal(claim: any) {
    this.currentClaim = claim;
    this.myModal.show();
    console.log(this.currentClaim);
  }
  openchatModal(claim: any) {
    this.currentClaim = claim;
    this.mychatModal.show();
    console.log(this.currentClaim);
    this.sendmail.patchValue({
      email: claim.user.email,
    })
  }
  send(){
    this.claimService.sendmail(this.sendmail.get('email').value,this.sendmail.get('message').value, this.jwt).subscribe(data=>{
     console.log(data);
   })
  }

  public contratsToPdf(claim) {
    var i;
    var imgData = 'data:image/png;base64,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'
    var imgIbm = 'data:image/png;base64,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'
    var doc = new jsPDF();
    doc.line(30, 30, 188, 30);
    doc.addImage(imgData, 'PNG', 20, 10, 40, 20);
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(25)
    doc.line(20, 270, 188, 270);
    doc.setFont('helvetica', 'bolditalic')
    doc.setFontSize(15)
    doc.setTextColor(255, 140, 0)
    doc.text('#' + claim.reference, 20, 45)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(11)
    doc.text('Date: ' + (new Date(claim.createDateTime)).toLocaleDateString(), 20, 50)
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text('From:', 20, 60)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(11)
    doc.text("Client: " + claim.user.name + " "+claim.user.lastname ,22, 65)
    doc.text("Email: " + claim.user.email ,22, 70)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text('To:', 20, 75)
    doc.setFont('helvetica', 'normal')
    doc.text('wecloud.esprit@gmail.com', 22, 80)
    doc.setFontSize(15)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text('Claim:', 20, 100)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(80, 80, 80)
    doc.setFontSize(12)
    const splitText = doc.splitTextToSize(claim.claim, 160);
    doc.text(splitText, 22, 105);

    doc.setFont('helvetica', 'bold')

    doc.addImage(imgIbm, 'PNG', 20, 272, 30, 15)
    doc.setFont('courier', 'bolditalic')
    doc.setFontSize(8)
    doc.text('1, 2 rue André Ampère - 2083 - Pôle Technologique - El Ghazala.', 58, 274)
    doc.text('Tél : T (216) 70 250 000 ', 58, 278)
    doc.text('E-mail : contact@esprit.tn, web : https://esprit.tn/', 58, 282)





    doc.setProperties({
      title: 'claim ' ,
      subject: 'claim',
      author: 'wecloud',

    });

    var string = doc.output('datauristring');
    var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
    var x = window.open();
    x.document.open();
    x.document.write(embed);
    x.document.close();
  }

}

