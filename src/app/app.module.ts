import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { ToastComponent } from './toast/toast.component';



import {MatNativeDateModule} from '@angular/material/core';
import jwt_decode from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
import { ResetComponent } from './loginreset/reset/reset.component';
import { ResetpasswordComponent } from './loginreset/resetpassword/resetpassword.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AssociationComponent } from './layouts/association/association.component';
import { ClaimComponent } from './claim/claim.component';
import { DossierComponent } from './dossier/dossier.component';
import { FichierComponent } from './fichier/fichier.component';
import { UserComponent } from './user/user.component';
import { ProductComponent } from './product/product.component';
import { EventComponent } from './event/event.component';
import { PotComponent } from './pot/pot.component';
import { OrderComponent } from './order/order.component';
import { PostComponent } from './post/post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
//npm install @angular/service-worker@13.2.6 --force
//ng add @angular/pwa@13.2.6
export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  imports: [
    BrowserAnimationsModule,

    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatSelectModule,

    MatDialogModule,
    MatInputModule,
    MatOptionModule,

    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AssociationComponent,
    LoginComponent,
    ProductDetailsComponent,
    ToastComponent,
    ResetComponent,
    ResetpasswordComponent,

    DossierComponent,
    FichierComponent,
    UserComponent,
    ProductComponent,
    PostComponent,
    EventComponent ,
    OrderComponent ,
    PotComponent ,
    ClaimComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,


  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
///////////////////////////////////////////////////////
