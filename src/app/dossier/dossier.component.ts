import { Component, OnInit, ViewChild } from '@angular/core';
import {DossierService}  from '../services/dossier/dossier.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.scss']
})
export class DossierComponent implements OnInit {

  ajoutform = new FormGroup({
         nom_dossier: new FormControl('', [Validators.required,Validators.minLength(3)]),

  })


  ajout() {
    //console.warn(this.loginForm.value);

      let logindata=JSON.stringify(this.ajoutform.value);



      this.ds.ajout(this.ajoutform.value).subscribe(res=>{

          console.log(res);
          window.location.reload();

      })


  }


  get nom_dossier() {
    return this.ajoutform.get('nom_dossier');
  }
  constructor(private modalService: NgbModal,private ds :DossierService, private router: Router ) { }
  dos: any;
  closeResult: string;

  fctdbl( iddos){
    console.log(iddos);
    this.router.navigate(['/fichier'], { queryParams: { id: iddos } });
  }

  ngOnInit(): void {

    this.ds.getdossier().subscribe(res=>{
     console.log(res.obj);
     this.dos=res.obj;
  });
  }
  @ViewChild('myModal') public myModal: ModalDirective;





















}
