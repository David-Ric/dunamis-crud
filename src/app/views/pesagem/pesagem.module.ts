import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CookieService } from 'ngx-cookie-service';
import { PESAGEM_ROUTES } from './pesagem.routing';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(PESAGEM_ROUTES),
    SharedModule
  ],
  providers:[CookieService]
})
export class PesagemModule { }
