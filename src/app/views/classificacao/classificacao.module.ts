import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CLASSIF_ROUTES } from './classificacao.routing';
import { CookieService } from 'ngx-cookie-service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(CLASSIF_ROUTES),
    SharedModule
  ],
  providers: [CookieService]
})
export class ClassificacaoModule { }
