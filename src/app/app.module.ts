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
import { CategoryComponent } from './category/category.component';
import {ModalModule} from "ngx-bootstrap/modal";
import {MatIconModule} from "@angular/material/icon";
import { StatisticsComponent } from './statistics/statistics.component';
import {ChartsModule} from "ng2-charts";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule,
    ModalModule,
    MatIconModule,
    ChartsModule

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ProductDetailsComponent,
    ToastComponent,
    ResetComponent,
    ResetpasswordComponent,
    CategoryComponent,
    StatisticsComponent,



  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
