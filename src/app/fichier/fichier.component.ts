import { Component, OnInit, ViewChild } from '@angular/core';
import { FichierService } from '../services/fichier/fichier.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-fichier',
  templateUrl: './fichier.component.html',
  styleUrls: ['./fichier.component.scss']
})
export class FichierComponent implements OnInit {

  constructor(private fs: FichierService,private activatedRoute: ActivatedRoute) { }
file : any;
ajoutform = new FormGroup({
  dossier: new FormControl('', [Validators.required,Validators.minLength(3)]),
})
  ngOnInit(): void {
  }
  onUpload(){

   this.activatedRoute.queryParams.subscribe(params => {



   this.ajoutform.patchValue({
     dossier:params["id"],

   })

  });
    console.log(this.ajoutform.value);
    //this.fs.postfichier(this.file).subscribe(res=>{
    //    console.log(res);
    //})
  };
  onChange(event){
    this.file = event.target.files[0];

  };

// we create an object that contains coordinates
menuTopLeftPosition =  {x: '0', y: '0'};

// reference to the MatMenuTrigger in the DOM
@ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;

/**
 * Method called when the user click with the right button
 * @param event MouseEvent, it contains the coordinates
 * @param item Our data contained in the row of the table
 */
onRightClick(event: MouseEvent, item) {
    // preventDefault avoids to show the visualization of the right-click menu of the browser
    event.preventDefault();


    // we record the mouse position in our object
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';

    // we open the menu
    // we pass to the menu the information about our object
    this.matMenuTrigger.menuData = {item: item}

    // we open the menu
    this.matMenuTrigger.openMenu();

}


}
