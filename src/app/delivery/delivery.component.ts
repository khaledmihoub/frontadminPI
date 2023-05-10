import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { CanActivate, Router } from '@angular/router';
import { DeliveryService } from '../services/Delivery/delivery.service'
import { Delivery } from './Models/Delivery';
import { ToastService } from '../_services/toast.service';
import {MatDialog} from "@angular/material/dialog";
import { HttpErrorResponse } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CookiesService } from '../services/cookie/cookies.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {
  @ViewChild('myupdateModal') myupdateModal: ModalDirective;

  deliveries: Delivery[]= [];
  deliverers:any[]=[];
  jwt : string;
  currentDelivery:any;
  updateform = new FormGroup({
    status: new FormControl('', []),
    adress: new FormControl('', []),
    deliverer: new FormControl('', [])
  })

  options = [
    { label: 'On Hold', value: 'On Hold' },
    { label: 'On Route', value: 'On Route' },
    { label: 'Delayed', value: 'Delayed' },
    { label: 'Delivered', value: 'Delivered' }
  ];


  constructor(private formBuilder: FormBuilder,private R: Router,private DeliveryService: DeliveryService,public dialog: MatDialog, public toastService: ToastService, private cs:CookiesService) {
    this.jwt=this.cs.getCookieJWT().toString();
   }

  ngOnInit(): void {
    this.DeliveryService.GetAllDeliveries()
      .subscribe(
        (Response: Delivery[]) => {
          console.log("1 : " + Response);
          this.deliveries = Response;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );

  }



  openModal(delivery: any) {
    this.DeliveryService.getDeliverers(this.jwt)
      .subscribe(
        (Response: any[]) => {
          this.deliverers = Response;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
    this.myupdateModal.show();
    this.currentDelivery=delivery;
    this.updateform.patchValue({
      status: delivery.status,
      adress: delivery.adress,
      deliverer: delivery.email
    })

    console.log("yassine" + delivery.email);

    
  }

  updateDelivery(delivery: any) {
    //delivery.status=this.updateform.get('status').value;
    delivery.status=this.updateform.get('status').value;
    delivery.email=this.updateform.get('deliverer').value;
    delivery.adress=this.updateform.get('adress').value;
    this.DeliveryService.UpdateDelivery(delivery,this.jwt).subscribe(data =>
      {
        console.log(data);
        this.myupdateModal.hide();
       // window.location.reload();
      })
  }

  deleteDelivery(delivery: any){
    this.DeliveryService.deleteDelivery(delivery.id,this.jwt).subscribe(res=>{
      console.log(res);
      const deliveryToDelete = this.deliveries.find(delivery => delivery.id === delivery.id);
      if (deliveryToDelete) {
        const index = this.deliveries.indexOf(deliveryToDelete);
        this.deliveries.splice(index, 1);
      }
  })
  }

}
