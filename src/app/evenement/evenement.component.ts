import { Component, OnInit, ViewChild } from '@angular/core';
import { EvenementService } from '../services/evenement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from '../entities/evenement';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Review } from '../entities/review';


@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss']
})
export class EvenementComponent implements OnInit {
  events?: Evenement[];
  reviews?: Review[];
  eventout: Evenement = new Evenement();
  eventup: Evenement = new Evenement();
  
  d:number;
  selectedfile:any;
  @ViewChild('myModalup') myModalup: ModalDirective;
  @ViewChild('myModalreview') myModalreview: ModalDirective;
  date: '';
  jwt : string;
  iduser:number;

  
  constructor(private evenementService: EvenementService ,private router: Router ,
    private route: ActivatedRoute //,private cs:CookiesService
    ) { 
    //  this.jwt=this.cs.getCookieJWT().toString();
    //  this.iduser=this.cs.getCookieIDUser();
    }
  

  ngOnInit(): void {
    this.evenementService.auth(this.jwt);
   
    this.getEvenements();
   
  }

  private getEvenements(){
    this.evenementService.getEvenementsList().subscribe(data => {
      this.events = data;

    });
  }

  private getReviews(id :number){
    
    this.evenementService.getReviewByEvent(id).subscribe(data => {
      this.reviews = data;
      

    });
    this.myModalreview.show();
    
  }


  EventDetails(id: number){
    this.router.navigate(['event-details', id]);
  } 

  updateEvent(id: number){
    this.router.navigate(['update-event', id]);
  }

  deleteEvent(id: number){
    if(window.confirm('Are you sure you want to delete this event?')){
    this.evenementService.deleteEvenement(id).subscribe( data => {
      console.log(data);
      this.getEvenements();
      alert("Event deleted successfully!");
    })}
  }

  

 saveEvent(){
  const formData: FormData = new FormData();
  formData.append('image', this.selectedfile, this.selectedfile.name);
  formData.append('post', JSON.stringify(this.eventout));
  console.log(formData)
    this.evenementService.createEvenementImage(formData).subscribe( data =>{
      console.log(data);
    }, error => console.log(error));
  }

  onFileSelected(event:any) {
    this.selectedfile=  event.target.files[0];
  }

  

  onSubmit(){
    console.log(this.eventout);
    this.saveEvent();
    alert("Event added successfully!");
    window.location.reload();
  }

  onSubmitUpdate(id: number){

    console.log("wael",id);
    this.evenementService.getEvenementById(id).subscribe(data => {
      this.eventup = data;
    }, error => console.log(error));
    this.myModalup.show();
 
    
  }

  Update(id: number){
    this.evenementService.updateEvenement( this.eventup).subscribe( data =>{
      alert("Event updated successfully!");
      window.location.reload();
    }
    , error => console.log(error));
    


  }
  startsWithTunisia(): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      const location = control.value;
      if (location && !location.startsWith('Tunisia')) {
        return { startsWithTunisia: true };
      }
      return null;
    };
 
}
/*
getCurrentDateTime(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day}T${hour}:${minute}`;
}*/

}
