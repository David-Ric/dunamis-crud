import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.routing';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES),
    SharedModule
  ],
  providers:[CookieService]
})
export class HomeModule { }
