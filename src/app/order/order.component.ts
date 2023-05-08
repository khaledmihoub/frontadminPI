import { Component, OnInit } from '@angular/core';
import {Product} from "../Models/Product";
import {HttpErrorResponse} from "@angular/common/http";
import {CommandeService} from "../services/Commande.Service";
import {CookiesService} from "../services/cookie/cookies.service";
import {Commande} from "../Models/Commande";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
jwt : string;
id: number;
commandes : Commande[] = [];
  searchTerm: any;

  constructor(private commandeService:CommandeService,
              private cs : CookiesService) {
    this.jwt = this.cs.getCookieJWT().toString();
    this.id=this.cs.getCookieIDUser();
  }

  ngOnInit(): void {
this.GetAllCommandes()
  }
  GetAllCommandes() {
    this.commandeService.getAllCommande(this.jwt)
      .subscribe(
        (response: Commande[]) => {
          this.commandes = response;
          console.log(this.commandes)

        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
  }

  searchProducts() {

  }
}
