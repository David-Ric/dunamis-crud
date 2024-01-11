import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importe o RouterModule
import { AppMaterialModule } from './app-material/app-material.module';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PhoneFormatPipe } from './pipes/phone/phone-format.pipe';
import { CpfFormatPipe } from './pipes/cpf/cpf-format.pipe';
import { CpfFormatDirective } from './diretivas/cpf/cpf-format.directive';
import { PhoneFormatDirective } from './diretivas/phone/phone-format.directive';

@NgModule({
  declarations: [
    PhoneFormatPipe,
    CpfFormatPipe,
    CpfFormatDirective,
    PhoneFormatDirective,
    LoadingModalComponent,
    ModalConfirmComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule,
  ],
  exports:[
    PhoneFormatPipe,
    CpfFormatPipe,
    LoadingModalComponent,
    ModalConfirmComponent,
    CpfFormatDirective,
    PhoneFormatDirective,
    NavBarComponent,
    FooterComponent,
    AppMaterialModule,
  ]
})
export class SharedModule { }
