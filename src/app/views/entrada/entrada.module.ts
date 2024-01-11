import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENTRADA_ROUTES } from './entrada.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { ReactiveFormsModule } from '@angular/forms';
import { EntradaComponent } from './entrada.component';
import { EntradaFormComponent } from './components/entrada-form/entrada-form.component';



@NgModule({
  declarations: [
    EntradaComponent,
    EntradaFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ENTRADA_ROUTES),
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService]
})
export class EntradaModule { }
