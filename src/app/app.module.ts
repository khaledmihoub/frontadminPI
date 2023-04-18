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

import {MatNativeDateModule} from '@angular/material/core';
import jwt_decode from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
import { ResetComponent } from './loginreset/reset/reset.component';
import { ResetpasswordComponent } from './loginreset/resetpassword/resetpassword.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  imports: [

    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot(),


  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    ResetComponent,
    ResetpasswordComponent,



  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
