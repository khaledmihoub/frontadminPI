import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import {MatSelectModule} from '@angular/material/select';

import { DossierComponent } from '../../dossier/dossier.component';
import { FichierComponent } from '../../fichier/fichier.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserComponent } from '../../user/user.component';
import { ProductComponent } from '../../product/product.component';
import { PostComponent } from '../../post/post.component';

import { OrderComponent } from '../../order/order.component';
import { PotComponent } from '../../pot/pot.component';
import { ClaimComponent } from '../../claim/claim.component';



// we need to import the menu trigger
import { MatMenuModule } from '@angular/material/menu';

  import { EvenementComponent } from '../../evenement/evenement.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";




@NgModule({
  imports: [


    MatMenuModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    ModalModule.forRoot(),

    MatButtonModule,
    MatDialogModule,
    MatInputModule,



  ],
  declarations: [


    DossierComponent,
    FichierComponent,
    UserComponent,
    ProductComponent,
    PostComponent,
    EvenementComponent,
    OrderComponent ,
    PotComponent ,
    ClaimComponent


  ]
})

export class AdminLayoutModule {}
