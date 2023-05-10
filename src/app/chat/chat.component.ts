import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { CanActivate, Router } from '@angular/router';
import { ChatService } from '../services/Chat/chat.service'
import { Chat } from './Models/Chat';
import { ToastService } from '../_services/toast.service';
import {MatDialog} from "@angular/material/dialog";
import { HttpErrorResponse } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CookiesService } from '../services/cookie/cookies.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  jwt : string;
  publicChats: Chat[]=[];
  privateChats: Chat[]=[];
  
  constructor(private formBuilder: FormBuilder,private R: Router,private ChatService: ChatService,public dialog: MatDialog, public toastService: ToastService, private cs:CookiesService) {
    this.jwt=this.cs.getCookieJWT().toString();
   }

  ngOnInit(): void {
    this.ChatService.getAllPublicChats(this.jwt)
      .subscribe(
        (Response: Chat[]) => {
          this.publicChats = Response;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );

      this.ChatService.getAllPrivateChats(this.jwt)
      .subscribe(
        (Response: Chat[]) => {
          this.privateChats = Response;
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );

  }

}
